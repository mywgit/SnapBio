import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
          background: "linear-gradient(135deg, #070a13 0%, #1e1b4b 100%)",
          border: "4px solid rgba(59, 130, 246, 0.4)",
        }}
      >
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "26px",
            background: "linear-gradient(135deg, #2563eb, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "64px",
            boxShadow: "0 12px 32px rgba(37, 99, 235, 0.5)",
          }}
        >
          ⚡
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
