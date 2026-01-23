import Divider from "./divider";
import { whoamiData } from "../data/whoamiData";

export default function About() {
  return (
    <>
      <section
        className="relative w-full min-h-screen bg-slate-950 text-gray-200 flex flex-col items-center pt-24"
        id="whoami"
      >
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-extrabold text-white drop-shadow-lg text-shadow-cyan tracking-wider leading-tight text-center"
            style={{
              textShadow:
                "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 224, 255, 0.2)",
            }}
          >
            {whoamiData.sectionTitle}
            <div className="flex justify-center mt-2">
              <div className="w-25">
                <Divider />
              </div>
            </div>
          </h1>
          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row items-center bg-black/80 shadow-[0_2px_24px_rgba(0,224,255,0.18)] rounded-[18px] p-10 gap-10">
              <img
                className="w-35 h-35 rounded-full shadow-[0_0_16px_#00e0ff,0_0_12px_#00ff99] object-cover"
                src="/images/me.png"
                alt="Author Name"
              />
              <div className="flex flex-col items-start gap-5">
                <p className="text-[#e0e0e0] text-lg leading-7 mb-2 text-shadow">
                  <span
                    dangerouslySetInnerHTML={{ __html: whoamiData.description }}
                  />
                </p>
                <div className="flex flex-col items-start gap-5">
                  <div className="flex justify-between gap-3 mb-4">
                    <p className="text-sm text-[#b0b0b0]">
                      <i className="fas fa-envelope text-cyan-400 mr-2"></i>
                      <a
                        href={`mailto:${whoamiData.email}`}
                        className="hover:text-cyan-400"
                      >
                        {whoamiData.email}
                      </a>
                    </p>
                    <p className="text-sm text-[#b0b0b0]">
                      <i className="fas fa-globe text-cyan-400 mr-2"></i>
                      {whoamiData.country}
                    </p>
                    <p className="text-sm text-[#b0b0b0]">
                      <i className="fas fa-map-marker-alt text-cyan-400 mr-2"></i>
                      {whoamiData.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
