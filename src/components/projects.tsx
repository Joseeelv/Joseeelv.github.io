import Divider from "./divider";
import { projectsData } from "../data/projectsData";

export default function Projects() {
  const projects = projectsData.projects;
  const isSingle = projects.length === 1;
  const isDouble = projects.length === 2;

  const cards = projects.map((project) => (
    <a
      key={project.title}
      className="group relative backdrop-blur-sm border border-cyan-400/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-200 hover:border-emerald-400/40 cursor-pointer max-w-md flex flex-col h-full"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="absolute inset-0  group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 transition-all duration-200" />
      <img
        src={project.image}
        alt={`${project.title} Screenshot`}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 "
      />

      {/* 2. AÑADIDO: 'flex flex-col flex-1' para que este div ocupe el espacio restante */}
      <div className="p-6 relative z-10 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2 text-white transition-colors">
          {project.title}
          <p className="bg-gray-600 hero-hr w-full lg:w-auto h-1 border-none mx-auto lg:mx-0 mb-8 rounded-sm opacity-70"></p>
        </h3>
        <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors -mt-5">
          {project.description}
        </p>

        {/* 3. AÑADIDO: 'mt-auto' para empujar esto al final de la tarjeta */}
        <div className="mt-auto pt-4 border-t border-gray-600">
          <p>
            <strong className="text-cyan-400">Tech stack:</strong>{" "}
            {project.techStack.join(", ")}
          </p>
        </div>
      </div>
    </a>
  ));

  return (
    <section
      className="relative w-full min-h-screen bg-slate-950 text-gray-200 flex flex-col items-center pt-24 pb-32"
      id="projects"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <h1
          className="text-5xl font-extrabold text-white drop-shadow-lg text-shadow-cyan tracking-wider leading-tight text-center"
          style={{
            textShadow:
              "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 224, 255, 0.2)",
          }}
        >
          {projectsData.title}
          <div className="flex justify-center mt-2">
            <div className="w-25">
              <Divider />
            </div>
          </div>
        </h1>

        {/* Projects grid or centered single card */}
        {isSingle ? (
          <div className="flex justify-center">{cards}</div>
        ) : isDouble ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
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
