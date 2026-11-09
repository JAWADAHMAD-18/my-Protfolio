interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  /** Separates limits that share an IP, for example "contact" and "chat". */
  prefix?: string;
  max?: number;
  windowMs?: number;
}

// In-memory fallback rate limiter. One map, keyed by prefix + IP.
const ipStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // 5 requests per window

export async function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): Promise<{ success: boolean; remaining: number }> {
  const prefix = options.prefix ?? "contact";
  const max = options.max ?? MAX_REQUESTS;
  const windowMs = options.windowMs ?? WINDOW_MS;

  // If Upstash env vars exist, query Upstash Redis REST API
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `ratelimit:${prefix}:${ip}`;
      const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
      // Increment key via Upstash REST API
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, windowSec],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const currentCount = data?.[0]?.result ?? 1;
        if (currentCount > max) {
          return { success: false, remaining: 0 };
        }
        return { success: true, remaining: Math.max(0, max - currentCount) };
      }
    } catch {
      // Fall through to in-memory on Upstash connection error
    }
  }

  // In-memory fixed window. Used when Upstash is not configured, or when it errors.
  const now = Date.now();
  const mapKey = `${prefix}:${ip}`;
  const entry = ipStore.get(mapKey);

  if (!entry || now > entry.resetAt) {
    ipStore.set(mapKey, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: max - entry.count };
}
