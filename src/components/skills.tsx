import Divider from "./divider";
import { skillsData } from "../data/skillsData";

export default function Skills() {
  // Función auxiliar para asignar tamaños estilo "Bento" según el índice
  // Esto crea el ritmo visual irregular (2 columnas, 1 columna alta, ancho completo, etc.)
  const getBentoClass = (index: number) => {
    switch (index) {
      case 0: // Programming Languages
        return "md:col-span-1";
      case 1: // Web Development (Muchos items, le damos altura vertical en desktop)
        return "md:col-span-2 md:row-span-1";
      case 2: // Databases
        return "md:col-span-1";
      case 3: // DevOps
        return "md:col-span-1";
      case 4: // Cybersecurity (Tu especialidad, le damos ancho completo abajo)
        return "md:col-span-1";
      default:
        return "md:col-span-1";
    }
  };

  return (
    <section
      className="relative w-full min-h-screen bg-slate-950 text-gray-200 flex flex-col items-center pt-24 pb-20"
      id="skills"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <h1
          className="text-5xl font-extrabold text-white drop-shadow-lg text-shadow-cyan tracking-wider leading-tight text-center mb-12"
          style={{
            textShadow:
              "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 224, 255, 0.2)",
          }}
        >
          {skillsData.sectionTitle}
          <div className="flex justify-center mt-2">
            <div className="w-24">
              <Divider />
            </div>
          </div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {skillsData.skills.map((skillGroup, index) => (
            <div
              key={index}
              className={`
                ${getBentoClass(index)}
                group relative overflow-hidden
                bg-slate-900/40 backdrop-blur-md
                border border-slate-800 hover:border-cyan-500/50
                rounded-3xl p-6
                transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
              `}
            >
              {/* Efecto de brillo en background al hacer hover */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h2 className="text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-2 relative z-10">
                {/* Decoración visual antes del título */}
                <span className="w-2 h-8 bg-cyan-900 rounded-full inline-block" />
                {skillGroup.fieldIcon && (
                  <img
                    src={skillGroup.fieldIcon}
                    alt={`${skillGroup.field} icon`}
                    className="w-8 h-8 brightness-0 invert"
                  />
                )}
                {skillGroup.field}
              </h2>

              <div className="flex flex-wrap gap-2 relative z-10">
                {skillGroup.items
                  .sort((a, b) => a.localeCompare(b))
                  .map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="
                      px-3 py-1.5 font-medium
                      bg-slate-800 text-slate-300
                      border border-slate-700 rounded-lg
                      group-hover:bg-slate-800/80 group-hover:text-white group-hover:border-cyan-500/30
                      transition-colors duration-300
                      cursor-default
                    "
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
