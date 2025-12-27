"use client";

import { useState, useRef, useEffect } from "react";

interface SudoProps {
  readonly onComplete?: () => void;
}

export default function Sudo({ onComplete }: SudoProps) {
  const [stage, setStage] = useState<"prompt" | "password" | "denied" | "granted">("prompt");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const RIDDLE = "What has keys but no locks, space but no room, and you can enter but can't go inside?";
  const ANSWER = "keyboard";
  const MEME_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useEffect(() => {
    if (stage === "prompt") {
      const timer = setTimeout(() => setStage("password"), 100);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "password") {
      inputRef.current?.focus();
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "granted") {
      const timer = setTimeout(() => {
        window.open(MEME_URL, "_blank");
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedAnswer = password.toLowerCase().trim();
    
    if (normalizedAnswer === ANSWER) {
      setStage("granted");
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 2) {
        setStage("denied");
      } else {
        setPassword("");
        inputRef.current?.focus();
      }
    }
  };

  return (
    <div className="sudo-output space-y-2">
      <p className="text-yellow-400">
        ⚠️  sudo: elevated privileges required
      </p>
      
      {stage === "password" && (
        <>
          <p className="text-zinc-400 mt-2">
            To continue, solve this riddle:
          </p>
          <p className="text-green-400 italic">
            &quot;{RIDDLE}&quot;
          </p>
          <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
            <span className="text-zinc-500">[sudo] answer:</span>
            <input
              ref={inputRef}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground flex-1"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
          {attempts > 0 && (
            <p className="text-red-400 text-sm">
              Incorrect. {3 - attempts} attempt{3 - attempts === 1 ? "" : "s"} remaining.
            </p>
          )}
        </>
      )}

      {stage === "denied" && (
        <div className="space-y-1">
          <p className="text-red-400">
            ✖ Access denied. Too many failed attempts.
          </p>
          <p className="text-zinc-500 text-sm">
            Hint: It&apos;s something you&apos;re probably using right now...
          </p>
        </div>
      )}

      {stage === "granted" && (
        <div className="space-y-1">
          <p className="text-green-400">
            ✓ Access granted...
          </p>
          <p className="text-zinc-500 text-sm animate-pulse">
            Wait, you are not admin...
          </p>
        </div>
      )}
    </div>
  );
}
