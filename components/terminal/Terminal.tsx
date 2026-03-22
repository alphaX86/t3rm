"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import CommandLine from "./CommandLine";
import Output from "./Output";
import Typewriter from "./Typewriter";
import BootSequence from "./BootSequence";
import MatrixRain from "./MatrixRain";
import { commands, parseCommand, isValidCommand } from "@/lib/commands";
import type { CommandOutput } from "@/lib/types";

// Konami Code sequence: ↑ ↑ ↓ ↓ (simplified)
const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"];

const ASCII_LOGO = [
  " ████████╗██████╗ ██████╗ ███╗   ███╗",
  " ╚══██╔══╝╚════██╗██╔══██╗████╗ ████║",
  "    ██║    █████╔╝██████╔╝██╔████╔██║",
  "    ██║    ╚═══██╗██╔══██╗██║╚██╔╝██║",
  "    ██║   ██████╔╝██║  ██║██║ ╚═╝ ██║",
  "    ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝",
  "",
  "v.1.0.5 - Terminal Portfolio",
  "",
  "Hello @guest! Welcome to my terminal portfolio.",
  "Type 'help' to see available commands.",
];

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<"dark" | "light" | "cyberpunk">("dark");
  const [bootComplete, setBootComplete] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome animation
    if (terminalRef.current && bootComplete) {
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [bootComplete]);

  useEffect(() => {
    // Scroll to bottom when new output is added
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.dataset.theme = theme === "rainbow" ? "dark" : theme;
  }, [theme]);

  // Konami Code detection - works globally when input is empty or not focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputFocused = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      // If input is focused and has text, don't capture (user is typing)
      if (isInputFocused && (target as HTMLInputElement).value?.length > 0) {
        return;
      }

      const key = e.key.toLowerCase();
      const expectedKey = KONAMI_CODE[konamiProgress].toLowerCase();

      if (key === expectedKey) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);

        if (newProgress === KONAMI_CODE.length) {
          // Konami Code complete!
          setKonamiUnlocked(true);
          setKonamiProgress(0);
          setTheme("rainbow");

          // Clear input if it was focused
          if (isInputFocused) {
            (target as HTMLInputElement).value = "";
            target.dispatchEvent(new Event("input", { bubbles: true }));
          }

          // Add celebration message
          const celebrationOutput: CommandOutput = {
            id: crypto.randomUUID(),
            command: "",
            output: (
              <div className="text-center py-4">
                <p className="text-2xl mb-2">🎉 🌈 KONAMI CODE ACTIVATED! 🌈 🎉</p>
                <p className="text-zinc-400">Rainbow mode unlocked! Type <span className="text-green-400">theme</span> to disable.</p>
              </div>
            ),
            timestamp: Date.now(),
          };
          setHistory((prev) => [...prev, celebrationOutput]);
        }
      } else {
        // Reset progress on wrong key (but allow same key to start sequence)
        setKonamiProgress(key === KONAMI_CODE[0].toLowerCase() ? 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  const handleCommand = (input: string) => {
    const fullCommand = input.trim();
    if (!fullCommand) return;

    // Parse command and args (e.g., "cowsay hello" -> command: "cowsay", args: "hello")
    const spaceIndex = fullCommand.indexOf(' ');
    const command = spaceIndex > 0 ? fullCommand.slice(0, spaceIndex).toLowerCase() : fullCommand.toLowerCase();
    const args = spaceIndex > 0 ? fullCommand.slice(spaceIndex + 1) : undefined;

    // Add to command history for arrow navigation
    setCommandHistory((prev) => [...prev, fullCommand]);
    setHistoryIndex(-1);

    // Handle special commands
    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "theme") {
      setTheme((prev) => {
        if (prev === "dark") return "light";
        if (prev === "light") return "dark";
        return "dark"; // rainbow goes back to dark
      });
      const newOutput: CommandOutput = {
        id: crypto.randomUUID(),
        command: fullCommand,
        output: `Theme switched to ${theme === "rainbow" ? "dark" : theme === "dark" ? "light" : "dark"} mode.`,
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, newOutput]);
      return;
    }

    if (command === "history") {
      const historyOutput = commandHistory.length > 0 ? (
        <div className="space-y-1">
          {commandHistory.map((cmd, index) => (
            <div key={`hist-${index}-${cmd}`} className="text-zinc-300">
              <span className="text-zinc-500 mr-3">{index + 1}</span>
              {cmd}
            </div>
          ))}
        </div>
      ) : (
        <span className="text-zinc-500">No commands in history</span>
      );

      const newOutput: CommandOutput = {
        id: crypto.randomUUID(),
        command: fullCommand,
        output: historyOutput,
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, newOutput]);
      return;
    }

    if (command === "banner") {
      const bannerOutput = (
        <pre className="text-green-400 text-xs sm:text-sm whitespace-pre">
{ASCII_LOGO.join("\n")}
        </pre>
      );
      const newOutput: CommandOutput = {
        id: crypto.randomUUID(),
        command: fullCommand,
        output: bannerOutput,
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, newOutput]);
      return;
    }

    if (command === "matrix") {
      setShowMatrix(true);
      const newOutput: CommandOutput = {
        id: crypto.randomUUID(),
        command: fullCommand,
        output: <span className="text-green-400">Entering the Matrix... (click to exit)</span>,
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev, newOutput]);
      return;
    }

    // Handle regular commands
    let output: React.ReactNode;
    if (isValidCommand(command)) {
      output = commands[command].execute(args);
    } else {
      output = (
        <span className="text-red-400">
          Command not found: {command}. Type <span className="text-green-400">help</span> for available commands.
        </span>
      );
    }

    const newOutput: CommandOutput = {
      id: crypto.randomUUID(),
      command: fullCommand,
      output,
      timestamp: Date.now(),
    };

    setHistory((prev) => [...prev, newOutput]);
  };

  const handleHistoryNavigation = (direction: "up" | "down"): string => {
    if (commandHistory.length === 0) return "";

    let newIndex: number;
    if (direction === "up") {
      newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1 
        ? -1 
        : Math.min(commandHistory.length - 1, historyIndex + 1);
    }

    setHistoryIndex(newIndex);
    return newIndex === -1 ? "" : commandHistory[newIndex];
  };

  const handleClear = () => {
    setHistory([]);
  };

  if (!bootComplete) {
    return (
      <div className="terminal">
        <div className="terminal-body">
          <BootSequence onComplete={() => setBootComplete(true)} />
        </div>
      </div>
    );
  }

  return (
    <>
      {showMatrix && <MatrixRain onComplete={() => setShowMatrix(false)} />}
      <div
        ref={terminalRef}
        className={`terminal ${theme}`}
        data-theme={theme}
      >
        <div className="terminal-body">
          <div className="terminal-welcome">
            <Typewriter 
              lines={ASCII_LOGO}
              speed={5}
              lineDelay={50}
              onComplete={() => setShowInput(true)}
              className="text-green-400 text-xs sm:text-sm font-mono whitespace-pre"
            />
          </div>
          {showInput && (
            <>
              <Output history={history} />
              <div ref={outputEndRef} />
              <CommandLine 
                onSubmit={handleCommand} 
                onHistoryNavigation={handleHistoryNavigation}
                onClear={handleClear}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
