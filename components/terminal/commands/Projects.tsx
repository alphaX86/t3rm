import projects from "@/content/projects.json";
import type { Project } from "@/lib/types";

export default function Projects() {
  return (
    <div className="projects-output space-y-4">
      <p className="text-zinc-400">My projects/OSS:</p>
      {(projects as Project[]).map((project, index) => (
        <div key={project.id} className="project-card">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">[{index + 1}]</span>
            <span className="text-green-400 font-semibold">{project.title}</span>
          </div>
          <p className="text-zinc-400 ml-6 mt-1">{project.description}</p>
          <div className="ml-6 mt-2 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="ml-6 mt-2 flex gap-4 text-sm">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
