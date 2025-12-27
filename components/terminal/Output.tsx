"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { CommandOutput } from "@/lib/types";

interface OutputProps {
  readonly history: CommandOutput[];
}

export default function Output({ history }: Readonly<OutputProps>) {
  return (
    <div className="output-container">
      {history.map((entry) => (
        <OutputEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

function OutputEntry({ entry }: Readonly<{ entry: CommandOutput }>) {
  const entryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entryRef.current) {
      gsap.fromTo(
        entryRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={entryRef} className="output-entry">
      <div className="output-command">
        <span className="text-green-400">guest</span>
        <span className="text-zinc-500">@</span>
        <span className="text-blue-400">t3rm</span>
        <span className="text-zinc-500">:~$</span>
        <span className="ml-2">{entry.command}</span>
      </div>
      {entry.output && (
        <div className="output-result">
          {entry.output}
        </div>
      )}
    </div>
  );
}
