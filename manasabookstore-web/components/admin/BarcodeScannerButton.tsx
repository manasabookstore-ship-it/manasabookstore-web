"use client";

import { Camera, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type BarcodeDetectorShape = {
  detect: (
    source: HTMLVideoElement,
  ) => Promise<Array<{ rawValue?: string; format?: string }>>;
};

type BarcodeDetectorConstructor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorShape;

type WindowWithBarcodeDetector = Window & {
  BarcodeDetector?: BarcodeDetectorConstructor;
};

export function BarcodeScannerButton({
  onDetected,
}: {
  onDetected: (barcode: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    let active = true;

    async function startScanner() {
      const BarcodeDetector = (window as WindowWithBarcodeDetector)
        .BarcodeDetector;

      if (!BarcodeDetector) {
        setMessage("Camera barcode scanning is not available in this browser.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef.current = stream;

        if (!videoRef.current) {
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        const detector = new BarcodeDetector({
          formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39"],
        });

        async function scan() {
          if (!active || !videoRef.current) {
            return;
          }

          const barcodes = await detector.detect(videoRef.current);
          const code = barcodes[0]?.rawValue;

          if (code) {
            onDetected(code);
            setOpen(false);
            return;
          }

          frameRef.current = window.requestAnimationFrame(scan);
        }

        frameRef.current = window.requestAnimationFrame(scan);
      } catch {
        setMessage("Camera permission is needed to scan barcodes.");
      }
    }

    void startScanner();

    return () => {
      active = false;
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [onDetected, open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setOpen(true);
        }}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
      >
        <Camera className="h-4 w-4" />
        Scan
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#071f33]/75 p-5">
          <div className="w-full max-w-md rounded-[8px] bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black">Scan barcode</h2>
                <p className="mt-1 text-xs font-semibold text-[#071f33]/58">
                  Point the camera at the barcode until it fills automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#f7faf9]"
                aria-label="Close scanner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <video
              ref={videoRef}
              muted
              playsInline
              className="mt-4 aspect-video w-full rounded-[8px] bg-[#071f33] object-cover"
            />
            {message ? (
              <p className="mt-3 rounded-[8px] bg-amber-50 p-3 text-sm font-bold text-amber-900">
                {message}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
