"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  readonly onComplete?: () => void;
}

export default function MatrixRain({ onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let frameCount = 0;
    const maxFrames = 10000; // Duration of the effect

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frameCount++;
      if (frameCount < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        // Fade out
        const fadeOut = () => {
          ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          if (frameCount < maxFrames + 30) {
            frameCount++;
            requestAnimationFrame(fadeOut);
          } else {
            onComplete?.();
          }
        };
        fadeOut();
      }
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 bg-black"
      onClick={onComplete}
    />
  );
}
