import Divider from "./divider";
import { whoamiData } from "../data/whoamiData";

export default function EducationExperience() {
  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-10"
      id="experience"
    >
      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-green-600/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-white font-mono matrix-title tracking-tight leading-tight text-center">
          {whoamiData.sectionExperience}
          <div className="flex justify-center mt-2">
            <div className="w-25 pb-5">
              <Divider />
            </div>
          </div>
        </h1>

        {whoamiData.experiences.map((experience, index) => (
          <div key={index} className="flex justify-center mb-10">
            <div className="flex flex-col bg-[#0a0a0a]/90 border border-[#1a1a1a] shadow-[0_2px_24px_rgba(0,255,65,0.08)] rounded-lg p-10 w-full gap-4">
              <h3 className="text-2xl font-bold text-[#00ff41] font-mono">
                <span className="text-gray-600 group-hover:text-[#00ff41]/50 transition-colors font-mono text-md pr-2">
                  {">_"}
                </span>
                {experience.title}
              </h3>
              <a
                className="text-sm text-gray-400 hover:text-[#00ff41] font-mono tracking-wide"
                href={experience.companyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {experience.company} • {experience.period}
              </a>
              <p className="text-lg text-[#e0e0e0] font-sans">
                <span
                  dangerouslySetInnerHTML={{ __html: experience.description }}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
