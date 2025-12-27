import type { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export interface Social {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface CommandOutput {
  id: string;
  command: string;
  output: ReactNode;
  timestamp: number;
}

export interface CommandHandler {
  description: string;
  execute: () => ReactNode;
}

export type CommandRegistry = Record<string, CommandHandler>;
