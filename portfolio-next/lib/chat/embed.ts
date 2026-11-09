export type EmbedTask = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

/**
 * Embed one string with the Gemini embedding model named by GEMINI_EMBED_MODEL.
 * Throws a short error (status only) so callers never log the source text.
 */
export async function embedText(text: string, taskType: EmbedTask): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_EMBED_MODEL?.replace(/^models\//, "");

  if (!apiKey || !model) {
    throw new Error("Gemini embedding is not configured");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:embedContent?key=${encodeURIComponent(apiKey)}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: { parts: [{ text }] },
        taskType,
      }),
    });
  } catch {
    throw new Error("Gemini embedding request failed");
  }

  if (!response.ok) {
    throw new Error(`Gemini embedding failed (${response.status})`);
  }

  const data = (await response.json()) as {
    embedding?: { values?: number[] };
  };
  const values = data.embedding?.values;

  if (!values || values.length === 0) {
    throw new Error("Gemini embedding response was empty");
  }

  return values;
}
