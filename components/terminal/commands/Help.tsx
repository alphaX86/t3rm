import { commands } from "@/lib/commands";

export default function Help() {
  return (
    <div className="help-output">
      <p className="text-zinc-400 mb-3">Available commands:</p>
      <div className="grid gap-1">
        {Object.entries(commands).map(([name, { description }]) => (
          <div key={name} className="flex gap-4">
            <span className="text-green-400 w-20">{name}</span>
            <span className="text-zinc-500">-</span>
            <span className="text-zinc-300">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
