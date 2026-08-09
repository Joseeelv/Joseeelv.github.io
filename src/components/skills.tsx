import Divider from "./divider";
import { skillsData } from "../data/skillsData";

export default function Skills() {
  const getBentoClass = (index: number) => {
    switch (index) {
      case 0:
        return "md:col-span-1";
      case 1:
        return "md:col-span-2 md:row-span-1";
      case 2:
        return "md:col-span-1";
      case 3:
        return "md:col-span-1";
      case 4:
        return "md:col-span-1";
      default:
        return "md:col-span-1";
    }
  };

  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-10"
      id="skills"
    >
      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-green-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl font-extrabold text-white font-mono matrix-title tracking-tight leading-tight text-center">
          {skillsData.sectionTitle}
          <div className="flex justify-center mt-2">
            <div className="w-24 pb-5">
              <Divider />
            </div>
          </div>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] ">
          {skillsData.skills.map((skillGroup, index) => (
            <div
              key={index}
              className={`${getBentoClass(index)} rounded-lg group relative overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00ff41]/30 p-6 transition-all duration-300`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[#00ff41]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h2 className="text-2xl font-bold text-[#00ff41] font-mono mb-4 flex items-center gap-2 relative z-10">
                {skillGroup.fieldIcon && (
                  <img
                    src={skillGroup.fieldIcon}
                    alt={`${skillGroup.field} icon`}
                    className="w-7 h-7 brightness-0 invert"
                  />
                )}
                {skillGroup.field}
              </h2>

              <div className="flex flex-wrap gap-2 relative z-10 ">
                {skillGroup.items
                  .sort((a, b) => a.localeCompare(b))
                  .map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 font-mono text-sm bg-black/50 text-gray-300 border border-[#1a1a1a] group-hover:border-[#00ff41]/20 group-hover:text-white transition-colors duration-300 cursor-default rounded-lg"
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
