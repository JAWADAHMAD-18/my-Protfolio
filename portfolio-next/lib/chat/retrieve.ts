import knowledgeBase from "@/kb/kb.embeddings.json";

export interface StoredChunk {
  id: string;
  source: string;
  title: string;
  text: string;
  embedding: number[];
}

export interface RetrievedChunk {
  id: string;
  source: string;
  title: string;
  text: string;
  score: number;
}

/** How many chunks are passed to the model. */
export const TOP_K = 4;

/**
 * Cosine similarity cutoff.
 * Unrelated questions on Gemini embeddings usually score well below this.
 * Raise it if weak matches still reach the model.
 */
export const MIN_SCORE = 0.5;

// Imported once per server instance. Rebuild with `npm run build:kb`.
const chunks = knowledgeBase as StoredChunk[];

export function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length);
  if (length === 0) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < length; i++) {
    const av = a[i];
    const bv = b[i];
    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function hasIndexedChunks(): boolean {
  return chunks.some((chunk) => Array.isArray(chunk.embedding) && chunk.embedding.length > 0);
}

/**
 * Rank indexed chunks against a query embedding.
 * Returns the top matches above MIN_SCORE, plus their source titles (deduped).
 */
export function retrieve(queryEmbedding: number[]): {
  chunks: RetrievedChunk[];
  sources: string[];
} {
  const ranked: RetrievedChunk[] = [];

  for (const chunk of chunks) {
    if (!chunk.embedding || chunk.embedding.length === 0) continue;

    const score = cosineSimilarity(queryEmbedding, chunk.embedding);
    if (score < MIN_SCORE) continue;

    ranked.push({
      id: chunk.id,
      source: chunk.source,
      title: chunk.title,
      text: chunk.text,
      score,
    });
  }

  ranked.sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, TOP_K);

  const sources: string[] = [];
  for (const chunk of top) {
    if (!sources.includes(chunk.title)) sources.push(chunk.title);
  }

  return { chunks: top, sources };
}

/** Plain-text block substituted into the system prompt. */
export function formatContext(matches: RetrievedChunk[]): string {
  return matches
    .map((chunk) => `Title: ${chunk.title}\n${chunk.text}`)
    .join("\n\n");
}
