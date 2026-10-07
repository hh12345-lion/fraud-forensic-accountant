import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fraud Forensic Accountant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#16211E",
          color: "#F5F5F5",
        }}
      >
        <div
          style={{
            width: 4,
            height: 80,
            background: "#6B8DB2",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#93ECE1",
            marginBottom: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Global · FraudForensicAccountant.com
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.15, maxWidth: 900 }}>
          Fraud Forensic Accountant
        </div>
        <div style={{ fontSize: 26, marginTop: 24, color: "#B8DBD9" }}>
          Civil and criminal fraud investigations · Asset tracing · Expert testimony
        </div>
      </div>
    ),
    { ...size }
  );
}
