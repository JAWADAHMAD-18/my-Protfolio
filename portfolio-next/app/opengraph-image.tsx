import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ogColors } from "@/lib/design-tokens";

export const alt = "Jawad Ahmad | Full-stack & AI Application Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const portrait = await readFile(
    path.join(process.cwd(), "public/media/profile/jawad-og.png")
  );
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: ogColors.background,
          padding: "80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle accent border top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: ogColors.accent,
          }}
        />

        {/* Top Header: Monogram Logo & Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: ogColors.surface,
                border: `1.5px solid ${ogColors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: ogColors.accent,
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                fontFamily: "monospace",
              }}
            >
              JA
            </div>
            <span
              style={{
                color: ogColors.text,
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Jawad Ahmad
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: ogColors.surface,
              border: `1px solid ${ogColors.border}`,
              color: ogColors.muted,
              fontSize: "14px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: ogColors.accent,
              }}
            />
            Available for work
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "760px",
            }}
          >
            <h1
              style={{
                color: ogColors.text,
                fontSize: "56px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Full-stack & AI application engineer.
            </h1>
            <p
              style={{
                color: ogColors.muted,
                fontSize: "26px",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Turning ideas into scalable, impactful products. Web, mobile and AI, built end to end.
            </p>
          </div>
          <img
            src={portraitSrc}
            alt=""
            width={240}
            height={320}
            style={{
              width: "240px",
              height: "320px",
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: "28px",
              border: `3px solid ${ogColors.accent}`,
            }}
          />
        </div>

        {/* Bottom Bar: Stack & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: `1px solid ${ogColors.border}`,
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              color: ogColors.muted,
              fontSize: "18px",
              fontFamily: "monospace",
              letterSpacing: "0.02em",
            }}
          >
            React · Next.js · React Native · Node.js · Django · LLM APIs
          </div>

          <div
            style={{
              color: ogColors.accent,
              fontSize: "18px",
              fontFamily: "monospace",
              fontWeight: 600,
            }}
          >
            jawads.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
