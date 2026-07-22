import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 32, height: 32 };
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
          background: "#06090a",
          border: "1px solid #ffb000",
          color: "#ffb000",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        {profile.initials}
      </div>
    ),
    size
  );
}
