import Divider from "./divider";
import { projectsData } from "../data/projectsData";

export default function Projects() {
  const projects = projectsData.projects;
  const isSingle = projects.length === 1;
  const isDouble = projects.length === 2;

  const cards = projects.map((project) => (
    <a
      key={project.title}
      className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00ff41]/30 transition-all duration-300 overflow-hidden cursor-pointer max-w-md w-full mx-auto flex flex-col h-full rounded-lg"
      style={{ boxShadow: "0 0 15px rgba(0, 255, 65, 0.05)" }}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border-b border-[#1a1a1a] font-mono text-xs text-gray-500">
        <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
        <div className="w-2 h-2 rounded-full bg-[#00ff41]/70"></div>
        <span className="ml-2">
          ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>
      <img
        src={project.image}
        alt={`${project.title} Screenshot`}
        loading="lazy"
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6 relative z-10 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2 text-white font-mono transition-colors">
          {project.title}
          <p className="bg-[#1a1a1a] w-full h-px border-none mt-2 mb-4 opacity-50"></p>
        </h3>
        <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors -mt-5">
          {project.description}
        </p>
        <div className="mt-auto pt-4 border-t border-[#1a1a1a]">
          <p className="text-sm font-mono">
            <strong className="text-[#00ff41]">Tech stack:</strong>{" "}
            <span className="text-gray-400">
              {project.techStack.join(", ")}
            </span>
          </p>
        </div>
      </div>
    </a>
  ));

  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-10"
      id="projects"
    >
      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold font-mono tracking-tight text-white matrix-title leading-tight text-center">
          {projectsData.title}
          <div className="flex justify-center mt-2 pb-5">
            <div className="w-25">
              <Divider />
            </div>
          </div>
        </h1>

        {isSingle ? (
          <div className="flex justify-center">{cards}</div>
        ) : isDouble ? (
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {cards}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards}
          </div>
        )}
      </div>
    </section>
  );
}
