"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TypewriterProps {
  readonly lines: string[];
  readonly speed?: number;
  readonly lineDelay?: number;
  readonly onComplete?: () => void;
  readonly className?: string;
}

export default function Typewriter({ 
  lines, 
  speed = 30, 
  lineDelay = 100,
  onComplete,
  className = ""
}: Readonly<TypewriterProps>) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, speed, lineDelay, onComplete]);

  // Animate each new line appearing
  useEffect(() => {
    if (containerRef.current && displayedLines.length > 0) {
      const lastLine = containerRef.current.children[displayedLines.length - 1];
      if (lastLine) {
        gsap.fromTo(
          lastLine,
          { opacity: 0.7 },
          { opacity: 1, duration: 0.1 }
        );
      }
    }
  }, [displayedLines.length]);

  return (
    <div ref={containerRef} className={className}>
      {displayedLines.map((line, index) => (
        <div key={`line-${index}-${line.slice(0, 5)}`} className="typewriter-line">
          {line}
          {index === currentLineIndex && !isComplete && (
            <span className="typewriter-cursor">▋</span>
          )}
        </div>
      ))}
    </div>
  );
}
