This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## How the chatbot works

The assistant answers only from the markdown files in `kb/`. It does not browse the web and it does not invent facts about Jawad.

1. `npm run build:kb` reads those files, splits them on `##` headings, and skips any chunk that still contains `[FILL]` or `[CONFIRM]` (it prints a warning for each skip).
2. Each remaining chunk is embedded with Gemini (`GEMINI_API_KEY`, `GEMINI_EMBED_MODEL`). The vectors are written to `kb/kb.embeddings.json`. Commit that file after a successful build.
3. `POST /api/chat` checks the body (message up to 500 characters, at most 8 earlier turns), then rate-limits by IP: 15 messages per 10 minutes. Upstash is used when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set; otherwise the limit is kept in memory for that server process.
4. The question is embedded, compared in memory with cosine similarity, and the top 4 chunks above a minimum score are placed in the system prompt. Source titles come back in the `X-Sources` header and in a final `sources` event.
5. Groq streams the reply (`GROQ_API_KEY`, `GROQ_MODEL`, `GROQ_FALLBACK_MODEL`) at temperature 0.25, capped at 400 tokens. The model defaults are `openai/gpt-oss-20b` and `openai/gpt-oss-120b`; a 400 or 404 from the primary model triggers one fallback attempt. If nothing in the index is relevant, the route returns a fixed fallback sentence and does not call Groq.

Message text is not written to the server logs. Copy `.env.example` to `.env.local` and fill in the keys before building the index or calling the model.

### Try it with curl

Start the app with `npm run dev`, then from `portfolio-next`:

```bash
# Grounded question. With an empty index this returns the fallback JSON
# and does not call Groq. After `npm run build:kb`, the same call streams
# tokens as server-sent events. -N disables buffering. -D - prints headers,
# including X-Sources.
curl.exe -N -D - http://localhost:3000/api/chat ^
  -H "Content-Type: application/json" ^
  --data-binary "{\"message\":\"Tell me about TripFusion\"}"
```

PowerShell (single quotes keep the JSON intact):

```powershell
curl.exe -N -D - http://localhost:3000/api/chat `
  -H "Content-Type: application/json" `
  --data-binary '{"message":"Tell me about TripFusion"}'
```

A question the index cannot answer returns JSON and does not call Groq:

```powershell
curl.exe -s http://localhost:3000/api/chat `
  -H "Content-Type: application/json" `
  --data-binary '{"message":"Does Jawad know Rust?"}'
```

```json
{"message":"I don't have that information. You can email Jawad at jawadahmad5618@gmail.com.","sources":[]}
```

Validation (over 500 characters, or more than 8 history turns) returns `400`. Sending more than 15 messages in 10 minutes returns `429`:

```powershell
1..20 | ForEach-Object {
  curl.exe -s -o NUL -w "request $($_) status %{http_code}`n" http://localhost:3000/api/chat `
    -H "Content-Type: application/json" `
    --data-binary '{"message":"Tell me about TripFusion"}'
}
```

A streamed reply looks like this. Tokens arrive first. Source titles are in the `X-Sources` response header and again in the last event:

```text
X-Sources: ["TripFusion"]

data: {"token":"TripFusion is "}

data: {"token":"Jawad's final year project."}

event: sources
data: {"sources":["TripFusion"]}
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
