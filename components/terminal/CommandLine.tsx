"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { gsap } from "gsap";
import { commands } from "@/lib/commands";

interface CommandLineProps {
  readonly onSubmit: (command: string) => void;
  readonly onHistoryNavigation: (direction: "up" | "down") => string;
  readonly onClear: () => void;
}

export default function CommandLine({ onSubmit, onHistoryNavigation, onClear }: Readonly<CommandLineProps>) {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    // Blinking cursor animation
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    }
  }, []);

  // Focus on any click/touch on the terminal
  useEffect(() => {
    const handleGlobalClick = () => {
      inputRef.current?.focus();
    };
    
    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("touchstart", handleGlobalClick);
    
    return () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("touchstart", handleGlobalClick);
    };
  }, []);

  // Update suggestion when input changes
  useEffect(() => {
    if (input.length > 0) {
      const commandList = Object.keys(commands);
      const match = commandList.find((cmd) => cmd.startsWith(input.toLowerCase()));
      setSuggestion(match && match !== input.toLowerCase() ? match : "");
    } else {
      setSuggestion("");
    }
  }, [input]);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+L to clear
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      onClear();
      return;
    }

    // Tab for autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setSuggestion("");
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(input);
      setInput("");
      setSuggestion("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevCommand = onHistoryNavigation("up");
      setInput(prevCommand);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextCommand = onHistoryNavigation("down");
      setInput(nextCommand);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div 
      className="command-line"
      onClick={handleContainerClick}
    >
      <span className="prompt">
        <span className="text-green-400">guest</span>
        <span className="text-zinc-500">@</span>
        <span className="text-blue-400">t3rm</span>
        <span className="text-zinc-500">:~$</span>
      </span>
      <div className="input-wrapper">
        <span className="input-text">{input}</span>
        {suggestion && (
          <span className="text-zinc-600">{suggestion.slice(input.length)}</span>
        )}
        <span ref={cursorRef} className="cursor">▋</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="command-input"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command input"
        />
      </div>
    </div>
  );
}
