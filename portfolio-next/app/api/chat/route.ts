import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { embedText } from "@/lib/chat/embed";
import {
  formatContext,
  hasIndexedChunks,
  retrieve,
} from "@/lib/chat/retrieve";
import { buildSystemPrompt, FALLBACK_LINE } from "@/lib/chat/system-prompt";
import { checkRateLimit } from "@/lib/rate-limit";


const CHAT_MAX_REQUESTS = 15;
const CHAT_WINDOW_MS = 10 * 60 * 1000;
const GROQ_TEMPERATURE = 0.25;
const GROQ_MAX_TOKENS = 400;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "openai/gpt-oss-20b";
const DEFAULT_GROQ_FALLBACK_MODEL = "openai/gpt-oss-120b";

const UNAVAILABLE =
  "The assistant is temporarily unavailable. You can email Jawad at jawadahmad5618@gmail.com.";

const historyTurnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z
    .string()
    .trim()
    .min(1)
    .max(500, "Each earlier message must be 500 characters or fewer."),
});

const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .max(500, "Please keep your message under 500 characters."),
  history: z
    .array(historyTurnSchema)
    .max(8, "Please keep the conversation to the last 8 turns.")
    .optional(),
});

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "127.0.0.1";
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function fallbackResponse() {
  return NextResponse.json({ message: FALLBACK_LINE, sources: [] });
}

function logGroqError(
  status: number | "no HTTP response",
  body: string,
  apiKey: string
) {
  console.error("Groq request failed", {
    status,
    body: (body || "(empty)").replaceAll(apiKey, "[REDACTED]"),
  });
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "unknown error";
}

async function readGroqErrorBody(response: Response) {
  try {
    return await response.text();
  } catch (error) {
    return `Unable to read response body: ${errorMessage(error)}`;
  }
}

function streamGroq(
  body: ReadableStream<Uint8Array>,
  sources: string[],
  status: number,
  apiKey: string
) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      let buffer = "";
      let upstreamErrorBody = "";

      const send = (chunk: string) => controller.enqueue(encoder.encode(chunk));

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;

            let json: {
              error?: unknown;
              choices?: Array<{ delta?: { content?: string } }>;
            };
            try {
              json = JSON.parse(data);
            } catch {
              // Ignore a partial or non-JSON keepalive line.
              continue;
            }

            if (json.error) {
              upstreamErrorBody = data;
              throw new Error(
                typeof json.error === "string"
                  ? json.error
                  : JSON.stringify(json.error)
              );
            }

            const token = json.choices?.[0]?.delta?.content;
            if (token) {
              send(`data: ${JSON.stringify({ token })}\n\n`);
            }
          }
        }

        send(`event: sources\ndata: ${JSON.stringify({ sources })}\n\n`);
        controller.close();
      } catch (error) {
        logGroqError(status, upstreamErrorBody || errorMessage(error), apiKey);
        send(
          `event: error\ndata: ${JSON.stringify({
            error: "The assistant hit a problem while replying. Please try again.",
          })}\n\n`
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Sources": JSON.stringify(sources),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError("Please send a JSON body with a message.", 400);
    }

    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? "Please check your message and try again.";
      return jsonError(message, 400);
    }

    const { message, history = [] } = parsed.data;

    const rateLimit = await checkRateLimit(clientIp(req), {
      prefix: "chat",
      max: CHAT_MAX_REQUESTS,
      windowMs: CHAT_WINDOW_MS,
    });

    if (!rateLimit.success) {
      return jsonError(
        "Too many messages. Please wait a few minutes and try again.",
        429
      );
    }

    // An empty index cannot answer. Skip both APIs.
    if (!hasIndexedChunks()) {
      return fallbackResponse();
    }

    let queryEmbedding: number[];
    try {
      queryEmbedding = await embedText(message, "RETRIEVAL_QUERY");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "embedding failed";
      console.error(`Query embedding failed: ${detail}`);
      return jsonError(UNAVAILABLE, 503);
    }

    const { chunks, sources } = retrieve(queryEmbedding);
    if (chunks.length === 0) {
      return fallbackResponse();
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("Chat provider is not configured");
      return jsonError(UNAVAILABLE, 503);
    }

    const model = process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;
    const fallbackModel =
      process.env.GROQ_FALLBACK_MODEL || DEFAULT_GROQ_FALLBACK_MODEL;
    const requestGroq = (requestModel: string) =>
      fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: requestModel,
          temperature: GROQ_TEMPERATURE,
          max_tokens: GROQ_MAX_TOKENS,
          stream: true,
          messages: [
            { role: "system", content: buildSystemPrompt(formatContext(chunks)) },
            ...history.map((turn) => ({ role: turn.role, content: turn.content })),
            { role: "user", content: message },
          ],
        }),
      });

    let groqResponse: Response;
    try {
      groqResponse = await requestGroq(model);
    } catch (error) {
      logGroqError("no HTTP response", errorMessage(error), apiKey);
      return jsonError(
        "The assistant could not reply just now. Please try again in a moment.",
        502
      );
    }

    let groqErrorBody: string | null = null;
    if (groqResponse.status === 400 || groqResponse.status === 404) {
      groqErrorBody = await readGroqErrorBody(groqResponse);
      logGroqError(groqResponse.status, groqErrorBody, apiKey);

      if (fallbackModel !== model) {
        try {
          groqResponse = await requestGroq(fallbackModel);
          groqErrorBody = null;
        } catch (error) {
          logGroqError("no HTTP response", errorMessage(error), apiKey);
          return jsonError(
            "The assistant could not reply just now. Please try again in a moment.",
            502
          );
        }
      }
    }

    if (!groqResponse.ok || !groqResponse.body) {
      const body =
        groqErrorBody ?? (await readGroqErrorBody(groqResponse));
      if (groqErrorBody === null) {
        logGroqError(groqResponse.status, body, apiKey);
      }
      return jsonError(
        "The assistant could not reply just now. Please try again in a moment.",
        502
      );
    }

    return streamGroq(groqResponse.body, sources, groqResponse.status, apiKey);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";
    console.error(`Chat route failed: ${detail}`);
    return jsonError("Something went wrong. Please try again in a moment.", 500);
  }
}
