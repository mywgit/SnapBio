import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          color: "white",
          fontSize: "18px",
          fontWeight: 800,
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
        }}
      >
        ⚡
      </div>
    ),
    {
      ...size,
    }
  );
}
