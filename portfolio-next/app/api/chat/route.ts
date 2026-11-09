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

function streamGroq(body: ReadableStream<Uint8Array>, sources: string[]) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      let buffer = "";

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

            try {
              const json = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const token = json.choices?.[0]?.delta?.content;
              if (token) {
                send(`data: ${JSON.stringify({ token })}\n\n`);
              }
            } catch {
              // Ignore a partial or non-JSON keepalive line.
            }
          }
        }

        send(`event: sources\ndata: ${JSON.stringify({ sources })}\n\n`);
        controller.close();
      } catch {
        // Status only. The visitor message is never logged.
        console.error("Groq stream failed");
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
    const model = process.env.GROQ_MODEL;
    if (!apiKey || !model) {
      console.error("Chat provider is not configured");
      return jsonError(UNAVAILABLE, 503);
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
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

    if (!groqResponse.ok || !groqResponse.body) {
      console.error(`Groq request failed with status ${groqResponse.status}`);
      return jsonError(
        "The assistant could not reply just now. Please try again in a moment.",
        502
      );
    }

    return streamGroq(groqResponse.body, sources);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";
    console.error(`Chat route failed: ${detail}`);
    return jsonError("Something went wrong. Please try again in a moment.", 500);
  }
}
