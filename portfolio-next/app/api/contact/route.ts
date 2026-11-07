import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  message: z.string().trim().min(1, "Please enter a message"),
  company: z.string().optional(), // Honeypot field
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Zod Validation
    const parseResult = contactSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const errorMap: Record<string, string> = {};
      parseResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          errorMap[String(err.path[0])] = err.message;
        }
      });
      return NextResponse.json(
        { success: false, errors: errorMap },
        { status: 400 }
      );
    }

    const { name, email, message, company } = parseResult.data;

    // 2. Honeypot check: if 'company' is filled, silently return 200 without sending
    if (company && company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // 3. Rate limiting per IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please wait a few minutes or email directly.",
        },
        { status: 429 }
      );
    }

    // 4. Server-side forwarding to Formspree
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      // In local dev without Formspree env set, log and succeed safely
      return NextResponse.json({
        success: true,
        message: "Message received in development mode.",
      });
    }

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong sending your message. Please try again or email directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
