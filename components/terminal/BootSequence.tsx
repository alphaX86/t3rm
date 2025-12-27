"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";

interface BootSequenceProps {
  readonly onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: "BIOS v2.4.1 - Kyro1 Inc.", delay: 100 },
  { text: "Checking memory... 640K OK", delay: 200 },
  { text: "Detecting hardware...", delay: 150 },
  { text: "  - Display: CRT Monitor (Phosphor Green)", delay: 100 },
  { text: "  - Keyboard: Mechanical", delay: 100 },
  { text: "  - Network: Connected", delay: 100 },
  { text: "Loading T3RM kernel...", delay: 300 },
  { text: "Mounting /home/guest/portfolio...", delay: 200 },
  { text: "Initializing services:", delay: 150 },
  { text: "  - Web Server... started", delay: 100 },
  { text: "Creating user: guest..", delay: 100 },
  { text: "Logging in as @guest", delay: 100 },
  { text: "User authentication... successful", delay: 2000 },
  { text: "Starting T3RM service...", delay: 150 },
  { text: "", delay: 2000 },
  { text: "Systems ready. GO!", delay: 200 },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= BOOT_MESSAGES.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    const { text, delay } = BOOT_MESSAGES[currentIndex];
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, text]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  useEffect(() => {
    // Animate progress bar
    const progressBar = document.getElementById("boot-progress");
    if (progressBar) {
      gsap.to(progressBar, {
        width: `${(currentIndex / BOOT_MESSAGES.length) * 100}%`,
        duration: 0.2,
        ease: "power1.out",
      });
    }
  }, [currentIndex]);

  return (
    <div className="boot-sequence p-4 font-mono text-sm">
      <div className="space-y-1">
        {lines.map((line, index) => (
          <div key={`boot-${index}-${line.slice(0, 10)}`} className="text-green-400 opacity-80">
            {line}
          </div>
        ))}
        {currentIndex < BOOT_MESSAGES.length && (
          <span className="text-green-400 animate-pulse">▋</span>
        )}
      </div>
      <div className="mt-4 w-64">
        <div className="h-2 bg-zinc-800 rounded overflow-hidden">
          <div
            id="boot-progress"
            className="h-full bg-green-500 w-0"
          />
        </div>
      </div>
    </div>
  );
}
