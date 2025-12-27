# Instructions for GitHub Copilot

## Project Overview
T3RM is a retro CRT-style terminal portfolio website with interactive command-line navigation, typewriter animations, and GSAP effects.

## Tech Stack
- **Next.js 16** with App Router (`app/` directory structure)
- **React 19** with Server Components by default
- **TypeScript** with strict mode and `@/*` path aliases
- **Tailwind CSS v4** using `@import "tailwindcss"` syntax in `globals.css`
- **GSAP** for animations (cursor blink, fade-in effects)
- **VT323** Google Font for retro terminal aesthetic

## Project Structure
```
app/
├── layout.tsx          # Root layout with VT323 font, metadata
├── page.tsx            # Home page - renders Terminal directly
├── globals.css         # Tailwind + CRT effects (scanlines, flicker, glow)
components/
├── terminal/
│   ├── Terminal.tsx    # Main terminal (fullscreen, client component)
│   ├── CommandLine.tsx # Input with prompt, arrow key history
│   ├── Output.tsx      # Renders command output history with GSAP
│   ├── Typewriter.tsx  # Line-by-line typing animation
│   └── commands/       # Individual command output components
│       ├── Help.tsx    # Lists all available commands
│       ├── About.tsx   # Bio/introduction
│       ├── Projects.tsx # Project cards from JSON
│       ├── Skills.tsx  # Technical skills list
│       ├── Contact.tsx # Social links from JSON
│       ├── Resume.tsx  # Resume download link
│       └── Sudo.tsx    # Easter egg with riddle → rickroll
lib/
├── commands.tsx        # Command registry and parser
└── types.ts            # Shared TypeScript types
content/
├── projects.json       # Project data (title, desc, tech, links)
└── socials.json        # Social links and contact info
public/                 # Static assets (images, resume.pdf)
```

## Development Commands
```bash
bun dev           # Start dev server (or npm run dev)
bun run build     # Production build
bun run lint      # ESLint with Next.js rules
```

## Code Conventions
- Use `"use client"` directive for interactive components (Terminal, CommandLine, etc.)
- CSS custom properties in `:root` for theming (`--background`, `--foreground`, `--terminal-bg`)
- Theme toggle via `data-theme` attribute on `<html>` element
- Font variable: `--font-terminal` (VT323 with monospace fallbacks)
- Path alias: `@/*` maps to project root
- Mark component props as `Readonly<>` for ESLint compliance

## Terminal Interface Pattern
- **Commands**: `help`, `about`, `projects`, `skills`, `contact`, `resume`, `sudo`, `theme`, `clear`
- Command registry in `lib/commands.tsx` maps command names to `{ description, execute }` objects
- Each command's `execute()` returns a React component or `null`
- Command history stored in state for up/down arrow navigation
- Welcome message uses `Typewriter` component for line-by-line animation

### Command Examples
```tsx
// lib/commands.tsx
export const commands: CommandRegistry = {
  help: {
    description: "Show available commands",
    execute: () => <Help />,
  },
  clear: {
    description: "Clear terminal output",
    execute: () => null, // Special case: handled in Terminal.tsx
  },
};
```

## Content Data Pattern
- **JSON** for structured data (`projects.json`, `socials.json`)
- Import content directly: `import projects from "@/content/projects.json"`

### Example: projects.json
```json
[
  {
    "id": "project-1",
    "title": "Project Name",
    "description": "Brief description",
    "tech": ["Next.js", "TypeScript"],
    "github": "https://github.com/...",
    "live": "https://..."
  }
]
```

## CRT Visual Effects
- Scanlines via CSS `repeating-linear-gradient` pseudo-element
- Screen flicker via CSS `@keyframes flicker` animation
- Green phosphor glow: `text-shadow` with `--glow-color`
- Theme colors: green (`#33ff33`) on dark (`#0d0d0d`)

## Accessibility & Performance
- Semantic HTML with proper ARIA labels for terminal input
- Keyboard navigation support (Enter to submit, arrows for history)
- Use Next.js `<Image>` for optimized images
- Prefer Server Components; minimize client bundle size
