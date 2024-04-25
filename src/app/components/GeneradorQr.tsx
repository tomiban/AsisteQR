"use client";

import { useQRCode } from "next-qrcode";

export default function GeneradorQr({ url }: { url: string }) {
  const { Canvas } = useQRCode();
  return (
    <Canvas
      text={url}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#121212",
          light: "#FFFFFF",
        },
      }}
      logo={{
        src: "https://secure.gravatar.com/blavatar/40ddc2718787dc6a1884319c6df2973d346cc8a88a8e4887b1e39fe4988a1186?s=200&ts=1705877252",
        options: { width: 50 },
      }}
    />
  );
}
