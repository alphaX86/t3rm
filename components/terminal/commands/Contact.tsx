import socials from "@/content/socials.json";
import type { Social } from "@/lib/types";

export default function Contact() {
  return (
    <div className="contact-output space-y-3">
      <p className="text-zinc-400">Get in touch:</p>
      <div className="space-y-2">
        {(socials as Social[]).map((social) => (
          <div key={social.id} className="flex items-center gap-3">
            <span className="text-yellow-400 w-20">{social.name}</span>
            <span className="text-zinc-500">→</span>
            <a 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {social.url.replace(/^(mailto:|https?:\/\/)/, "")}
            </a>
          </div>
        ))}
      </div>
      <p className="text-zinc-500 mt-4 text-sm">
        Feel free to reach out! I&apos;m always open to interesting conversations and opportunities.
      </p>
    </div>
  );
}
