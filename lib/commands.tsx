"use client";

import type { CommandRegistry } from "./types";
import Help from "@/components/terminal/commands/Help";
import About from "@/components/terminal/commands/About";
import Projects from "@/components/terminal/commands/Projects";
import Skills from "@/components/terminal/commands/Skills";
import Contact from "@/components/terminal/commands/Contact";
import Resume from "@/components/terminal/commands/Resume";
import Sudo from "@/components/terminal/commands/Sudo";

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
    execute: () => (
      <div className="text-zinc-400">
        <p>Usage: cat &lt;filename&gt;</p>
        <p className="text-zinc-500 text-sm mt-1">Try: cat .secrets</p>
      </div>
    ),
  },
  "cat .secrets": {
    description: "Display secrets file",
    execute: () => (
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
    ),
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
};

export function parseCommand(input: string): string {
  return input.trim().toLowerCase();
}

export function isValidCommand(command: string): boolean {
  return command in commands;
}
