export default function Resume() {
  return (
    <div className="resume-output space-y-3">
      <p className="text-zinc-400">Download my resume:</p>
      <div className="flex items-center gap-3">
        <span className="text-green-400">→</span>
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          resume.pdf ↗
        </a>
      </div>
      <p className="text-zinc-500 text-sm mt-2">
        Place your resume PDF in the <span className="text-zinc-300">public/</span> folder as <span className="text-zinc-300">resume.pdf</span>
      </p>
    </div>
  );
}
