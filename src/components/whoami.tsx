import Divider from "./divider";
import { whoamiData } from "../data/whoamiData";

export default function About() {
  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-10"
      id="whoami"
    >
      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-white matrix-title font-mono tracking-tight leading-tight text-center">
          {whoamiData.sectionTitle}
          <div className="flex justify-center mt-2">
            <div className="w-25  pb-5">
              <Divider />
            </div>
          </div>
        </h1>
        <div className="flex justify-center ">
          <div className="flex flex-col md:flex-row items-center bg-[#0a0a0a]/90 shadow-[0_2px_24px_rgba(0,255,65,0.08)] rounded-lg p-10 gap-10 border border-[#1a1a1a]">
            <img
              className="w-35 h-35 rounded-full shadow-[0_0_16px_#00ff41,0_0_12px_#00cc33] object-cover"
              src="/images/me.png"
              alt="Author"
            />
            <div className="flex flex-col items-start gap-5">
              <p className="text-[#e0e0e0] text-lg leading-7 mb-2 font-sans">
                <span
                  dangerouslySetInnerHTML={{ __html: whoamiData.description }}
                />
              </p>
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-wrap justify-between gap-3 mb-4">
                  <p className="text-sm text-gray-400 font-mono">
                    <span className="text-[#00ff41] mr-2">$</span>
                    <a
                      href={`mailto:${whoamiData.email}`}
                      className="hover:text-[#00ff41]"
                    >
                      {whoamiData.email}
                    </a>
                  </p>
                  <p className="text-sm text-gray-400 font-mono">
                    <span className="text-[#00ff41] mr-2">$</span>
                    {whoamiData.country}
                  </p>
                  <p className="text-sm text-gray-400 font-mono">
                    <span className="text-[#00ff41] mr-2">$</span>
                    {whoamiData.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-white font-mono matrix-title tracking-tight leading-tight text-center pt-10">
          {whoamiData.sectionEducation}
          <div className="flex justify-center mt-2 pb-5">
            <div className="w-25 pb-5">
              <Divider />
            </div>
          </div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whoamiData.education.map((education, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#0a0a0a]/90 border border-[#1a1a1a] shadow-[0_2px_12px_rgba(0,255,65,0.08)] rounded-lg p-10 w-full"
            >
              <h3 className="text-2xl font-bold text-[#00ff41] font-mono">
                <span className="text-gray-600 group-hover:text-[#00ff41]/50 transition-colors font-mono text-md pr-2">
                  {">_"}
                </span>
                {education.degree}
              </h3>
              <p className="text-sm text-gray-400 font-mono">
                {education.period}
              </p>
              <a
                className="text-lg text-[#e0e0e0] hover:text-[#00ff41] font-sans"
                href={education.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {education.institution}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
