"use client";

import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

export default function QRCodeDisplay({ value, size = 120, showDownload = false }: { value: string; size?: number; showDownload?: boolean }) {
  const canvasId = `qr-code-canvas-${value.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  const downloadQRCode = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `pezzava-qr-${value.split('/').pop()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="relative group">
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm inline-block overflow-hidden">
        <QRCodeCanvas
          id={canvasId}
          value={value}
          size={size}
          level={"H"}
          includeMargin={true}
          imageSettings={{
            src: "/logo.png",
            x: undefined,
            y: undefined,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          }}
        />
      </div>
      
      {showDownload && (
        <button
          onClick={downloadQRCode}
          className="absolute -top-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/90"
          title="Download QR Code"
        >
          <Download size={14} />
        </button>
      )}
    </div>
  );
}

