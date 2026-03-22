"use client";

import type { CommandRegistry } from "./types";
import Help from "@/components/terminal/commands/Help";
import About from "@/components/terminal/commands/About";
import Projects from "@/components/terminal/commands/Projects";
import Skills from "@/components/terminal/commands/Skills";
import Contact from "@/components/terminal/commands/Contact";
import Resume from "@/components/terminal/commands/Resume";
import Sudo from "@/components/terminal/commands/Sudo";
import quotes from "@/content/quotes.json";

// Helper function to create speech bubble for cowsay
function createSpeechBubble(message: string): string {
  const lines = message.split('\n');
  const maxLen = Math.max(...lines.map(line => line.length));
  const width = Math.min(maxLen + 2, 40);

  const wrappedLines: string[] = [];
  lines.forEach(line => {
    if (line.length <= width) {
      wrappedLines.push(line);
    } else {
      for (let i = 0; i < line.length; i += width) {
        wrappedLines.push(line.slice(i, i + width));
      }
    }
  });

  const topBorder = ' ' + '_'.repeat(width + 2);
  const bottomBorder = ' ' + '-'.repeat(width + 2);

  const contentLines = wrappedLines.map((line, index) => {
    const padded = line.padEnd(width, ' ');
    if (wrappedLines.length === 1) {
      return `< ${padded} >`;
    } else if (index === 0) {
      return `/ ${padded} \\`;
    } else if (index === wrappedLines.length - 1) {
      return `\\ ${padded} /`;
    } else {
      return `| ${padded} |`;
    }
  });

  return [topBorder, ...contentLines, bottomBorder].join('\n');
}

// Helper function for fortune
function getFortune(category?: string): string {
  let filtered = quotes;
  if (category && category !== 'all') {
    filtered = quotes.filter(q => q.category === category);
  }
  if (filtered.length === 0) {
    filtered = quotes;
  }
  const random = filtered[Math.floor(Math.random() * filtered.length)];
  return `[${random.category}] ${random.text}`;
}

export const commands: CommandRegistry = {
  help: {
    description: "Show available commands",
    execute: () => <Help />,
  },
  about: {
    description: "Learn about me",
    execute: () => <About />,
  },
  projects: {
    description: "View my projects",
    execute: () => <Projects />,
  },
  skills: {
    description: "See my technical skills",
    execute: () => <Skills />,
  },
  contact: {
    description: "Get my contact info",
    execute: () => <Contact />,
  },
  resume: {
    description: "Download my resume",
    execute: () => <Resume />,
  },
  sudo: {
    description: "Run with elevated privileges",
    execute: () => <Sudo />,
  },
  clear: {
    description: "Clear terminal output",
    execute: () => null,
  },
  theme: {
    description: "Toggle light/dark theme",
    execute: () => null, // Handled specially in Terminal
  },
  // System commands
  pwd: {
    description: "Print working directory",
    execute: () => <span className="text-zinc-300">/home/guest/portfolio</span>,
  },
  whoami: {
    description: "Display current user",
    execute: () => <span className="text-zinc-300">guest</span>,
  },
  ls: {
    description: "List directory contents",
    execute: () => (
      <div className="text-zinc-300 space-y-1">
        <div className="flex flex-wrap gap-4">
          <span className="text-blue-400">about/</span>
          <span className="text-blue-400">projects/</span>
          <span className="text-blue-400">skills/</span>
          <span className="text-blue-400">contact/</span>
          <span className="text-green-400">resume.pdf</span>
          <span className="text-zinc-500">.secrets</span>
        </div>
      </div>
    ),
  },
  cd: {
    description: "Change directory",
    execute: () => <span className="text-yellow-400">Uhh.. you can&apos;t do that right now</span>,
  },
  man: {
    description: "Display manual for a command",
    execute: () => (
      <div className="text-zinc-400">
        <p>Usage: man &lt;command&gt;</p>
        <p className="text-zinc-500 text-sm mt-1">Try: help</p>
      </div>
    ),
  },
  date: {
    description: "Display current date and time",
    execute: () => (
      <span className="text-zinc-300">
        {new Date().toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })}
      </span>
    ),
  },
  cat: {
    description: "Display file contents",
    execute: (args) => {
      if (args?.trim() === ".secrets") {
        return (
          <div className="space-y-2">
            <p className="text-yellow-400">🔓 Decrypting .secrets...</p>
            <div className="text-zinc-300 space-y-1 mt-2">
              <p>• ✋ 💣✌💧💧📫🏱☼⚐👎🕆👍☜ 💧✋👎☜ 🏱☼⚐☺☜👍❄💧 ✌☠👎 ☠☜✞☜☼ ☼☜☹☜✌💧☜ ❄☟☜💣 (‾◡◝)</p>
              <p>• ✋ 🕈✌❄👍☟ ✌☠✋💣☜ ✌ ☹⚐❄ 🕿💧⚐☼☼✡📪 ✋ ✌💣 ☠⚐❄ ⚐☠☜ 🏱✋☜👍☜ ☞✌☠ ✡☜❄✆ ✌☠👎 💧⚐💣☜❄✋💣☜💧 ✋ 👍☼☜✌❄☜ 💧❄⚐☼✋☜💧. ☠☜✞☜☼ ☼☜☹☜✌💧☜👎 ❄☟☜💣 ❄☟⚐🕆☝☟ ✌💧 ❄☜👍☟☠✋👍✌☹☹✡ ❄☟☜✡ ✌☼☜ 💧❄✋☹☹ ✋☠ 🏱☼⚐☝☼☜💧💧.</p>
              <p>• 💣✡ 👍⚐👎☜ 🕈⚐☼😐💧 ✌☠👎 💧⚐💣☜❄✋💣☜💧 ✋ 🕈⚐☠👎☜☼ ☟⚐🕈 ✋❄ 🕈⚐☼😐💧 ☜✞☜☠ ❄☟⚐🕆☝☟ ✋☞ ✋❄ 👎⚐☜💧 ☠⚐❄ 💣✌😐☜ 💧☜☠💧☜. (┬┬﹏┬┬)</p>
              <p>• ❄☟✋💧 🏱⚐☼❄☞⚐☹✋⚐ 🕈✌💧 👌🕆✋☹❄ 🕈☟✋☹☜ 🏱☼⚐👍☼✌💧❄✋☠✌❄✋☠☝ ⚐☠ ✌☠⚐❄☟☜☼ 🏱☼⚐☺☜👍❄</p>
              <p>• 💣✡ ☠☜✠❄ 🏱☼⚐☺☜👍❄ 🕈✋☹☹ 👌☜ 👎⚐☠☜ ⚐☠ ✌ ☠☜🕈 👌☼✌☠👎 ☠✌💣☜ ⚐☞ 💣✋☠☜ 🕈☟✋👍☟ ✋💧 ✌✋💣☜👎 ☞⚐☼ 💣✡ 💧✌☠👎👌⚐✠ 👌✌💧☜👎 ☜✠🏱☜☼✋💣☜☠❄💧. 💧❄✌✡ ❄🕆☠☜👎✏</p>
              <p>• If you are still confused on above text, I would suggest you to play UNDERTALE (^人^)</p>
            </div>
            <p className="text-zinc-500 text-sm mt-2">EOF</p>
          </div>
        );
      }
      return (
        <div className="text-zinc-400">
          <p>Usage: cat &lt;filename&gt;</p>
          <p className="text-zinc-500 text-sm mt-1">Try: cat .secrets</p>
        </div>
      );
    },
  },
  banner: {
    description: "Display ASCII banner",
    execute: () => null, // Handled specially in Terminal
  },
  history: {
    description: "Show command history",
    execute: () => null, // Handled specially in Terminal (needs state)
  },
  matrix: {
    description: "Enter the Matrix",
    execute: () => null, // Handled specially in Terminal
  },
  // Easter egg commands
  cowsay: {
    description: "ASCII cow with message (cowsay <message>)",
    execute: (args) => {
      const message = args?.trim() || "Moo!";
      const bubble = createSpeechBubble(message);
      const cow = String.raw`
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||`;
      return (
        <pre className="text-zinc-300 whitespace-pre font-mono">
          {bubble + cow}
        </pre>
      );
    },
  },
  fortune: {
    description: "Random quote (fortune [dev|life|motivation|all])",
    execute: (args) => {
      const category = args?.trim().toLowerCase() || 'all';
      const validCategories = ['dev', 'life', 'motivation', 'all'];
      if (!validCategories.includes(category)) {
        return (
          <span className="text-yellow-400">
            Unknown category. Try: dev, life, motivation, or all.
          </span>
        );
      }
      const fortune = getFortune(category === 'all' ? undefined : category);
      return (
        <div className="text-zinc-300 italic">
          {fortune}
        </div>
      );
    },
  },
  // Hidden commands (not shown in help)
  "?": {
    description: "",
    execute: () => {
      window.location.href = "#";
      window.dispatchEvent(new CustomEvent("terminal-command", { detail: { command: "help" } }));
      return null;
    },
  },
  "42": {
    description: "",
    execute: () => (
      <div className="text-cyan-400 font-mono">
        <p className="text-lg">🌌 42</p>
        <p className="text-zinc-400 mt-2">The Answer to Life, the Universe, and Everything.</p>
        <p className="text-zinc-500 text-sm mt-1">- The Hitchhiker&apos;s Guide to the Galaxy</p>
      </div>
    ),
  },
  ping: {
    description: "",
    execute: () => (
      <div className="text-zinc-300 font-mono space-y-1">
        <p>PING portfolio.kyro1.com (127.0.0.1): 56 data bytes</p>
        <p>64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.420 ms</p>
        <p>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.1337 ms</p>
        <p>64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.69 ms</p>
        <p>64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=4.20 ms</p>
        <p className="text-zinc-500 mt-2">--- portfolio.kyro1.com ping statistics ---</p>
        <p>4 packets transmitted, 4 received, 0% packet loss</p>
        <p className="text-green-400">pong! 🏓</p>
      </div>
    ),
  },
  coffee: {
    description: "",
    execute: () => (
      <div className="text-zinc-300">
        <p>☕ Brewing coffee...</p>
        <p className="text-yellow-400 mt-1">✓ Done! Enjoy your coffee! ☕</p>
        <p className="text-zinc-500 text-sm mt-1">Caffeine level: 100%</p>
      </div>
    ),
  },
  exit: {
    description: "",
    execute: () => (
      <div className="text-red-400">
        <p>🚪 You can check out any time you like...</p>
        <p className="text-zinc-500 mt-1 italic">But you can never leave. 🎸</p>
        <p className="text-zinc-600 text-sm mt-2">- Hotel California</p>
      </div>
    ),
  },
  quit: {
    description: "",
    execute: () => (
      <div className="text-red-400">
        <p>🚪 You can check out any time you like...</p>
        <p className="text-zinc-500 mt-1 italic">But you can never leave. 🎸</p>
        <p className="text-zinc-600 text-sm mt-2">- Hotel California</p>
      </div>
    ),
  },
  hint: {
    description: "",
    execute: () => (
      <div className="text-zinc-300">
        <p className="text-yellow-400">💡 Secret Commands Hint:</p>
        <p className="mt-2">Try the Konami Code with arrow keys...</p>
        <p className="text-zinc-500 text-sm mt-1">↑ ↑ ↓ ↓</p>
      </div>
    ),
  },
};

export function parseCommand(input: string): string {
  return input.trim().toLowerCase();
}

export function isValidCommand(command: string): boolean {
  return command in commands;
}
