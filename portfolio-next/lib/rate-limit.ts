interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory fallback rate limiter
const ipStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // 5 requests per window

export async function checkRateLimit(ip: string): Promise<{ success: boolean; remaining: number }> {
  // If Upstash env vars exist, query Upstash Redis REST API
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `ratelimit:contact:${ip}`;
      // Increment key via Upstash REST API
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, 600],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const currentCount = data?.[0]?.result ?? 1;
        if (currentCount > MAX_REQUESTS) {
          return { success: false, remaining: 0 };
        }
        return { success: true, remaining: Math.max(0, MAX_REQUESTS - currentCount) };
      }
    } catch {
      // Fall through to in-memory on Upstash connection error
    }
  }

  // In-memory sliding window rate limiter
  const now = Date.now();
  const entry = ipStore.get(ip);

  // Clean expired entry
  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: MAX_REQUESTS - entry.count };
}
