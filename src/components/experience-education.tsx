import Divider from "./divider";
import { whoamiData } from "../data/whoamiData.ts";

export default function EducationExperience() {
  return (
    <>
      <section
        className="relative w-full min-h-screen bg-slate-950 text-gray-200 flex flex-col items-center pt-24"
        id="experience-education"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-extrabold text-white drop-shadow-lg text-shadow-cyan tracking-wider leading-tight text-center"
            style={{
              textShadow:
                "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 224, 255, 0.2)",
            }}
          >
            {whoamiData.sectionExperience}
            <div className="flex justify-center mt-2">
              <div className="w-25">
                <Divider />
              </div>
            </div>
          </h1>
          {whoamiData.experiences.map((experience, index) => (
            <div key={index} className="flex justify-center mb-10">
              <div className="flex flex-col bg-black/80 shadow-[0_2px_24px_rgba(0,224,255,0.18)] rounded-[18px] p-10 w-full gap-4">
                <h3 className="text-2xl font-bold text-cyan-400">
                  {experience.title}
                </h3>
                <a
                  className="text-sm text-[#b0b0b0] hover:text-gray-100"
                  href={experience.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {experience.company} • {experience.period}
                </a>
                <p className="text-lg text-[#e0e0e0]">
                  <span
                    dangerouslySetInnerHTML={{ __html: experience.description }}
                  />
                </p>
              </div>
            </div>
          ))}
          <h1
            className="text-5xl font-extrabold text-white drop-shadow-lg text-shadow-cyan tracking-wider leading-tight text-center"
            style={{
              textShadow:
                "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 224, 255, 0.2)",
            }}
          >
            {whoamiData.sectionEducation}
            <div className="flex justify-center mt-2">
              <div className="w-25">
                <Divider />
              </div>
            </div>
          </h1>
          {whoamiData.education.map((education, index) => (
            <div key={index} className="flex justify-center mb-10">
              <div className="flex flex-col bg-black/80 shadow-[0_2px_24px_rgba(0,224,255,0.18)] rounded-[18px] p-10 w-full gap-4">
                <div className="relative p-1">
                  <div className="absolute -left-2.25 top-0 w-4 h-4 "></div>
                  <h3 className="text-2xl font-bold text-cyan-400">
                    {education.degree}
                  </h3>
                  <p className="text-sm text-[#b0b0b0]">{education.period}</p>
                  <a
                    className="text-lg text-[#e0e0e0] hover:text-gray-400"
                    href={education.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {education.institution}{" "}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
