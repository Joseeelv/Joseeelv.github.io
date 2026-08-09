import { useState } from "react";
import { Mail, Download } from "lucide-react";
import Divider from "./divider";
import ContactForm from "./contactForm";
import { heroData } from "../data/heroData";

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="w-4 h-4" />,
  Download: <Download className="w-4 h-4" />,
};

export default function Hero() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const getIcon = (iconName: string) => iconMap[iconName] ?? null;

  return (
    <section
      className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex items-center pt-10"
      id="hero"
    >
      {/* Binary diagonal background effect */}
      <div className="binary-diagonal absolute inset-0 z-0 pointer-events-none"></div>

      {/* Hero body container */}
      <div className="hero-body relative z-10 w-full flex flex-col items-center py-20">
        <div className="hero-flex flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 gap-12 lg:gap-8 w-full">
          {/* Text container */}
          <div className="container w-full max-w-2xl lg:max-w-none lg:w-auto px-4 sm:px-6 text-center lg:text-left flex-1">
            {/* Avatar - Mobile */}
            <div className="hero-icon-right flex lg:hidden relative w-40 h-40 sm:w-56 sm:h-56 items-center justify-center shrink-0 mb-8 mx-auto">
              <div
                className="absolute inset-0 rounded-full z-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0, 255, 65, 0.8) 0%, rgba(0, 255, 65, 0.1) 100%)",
                  filter: "blur(30px)",
                  opacity: 0.5,
                  animation: "pulse-halo 3s ease-in-out infinite",
                }}
              ></div>
              <img
                src="/images/hacker.gif"
                alt="Hacker Icon"
                className="relative z-10 w-auto max-w-1xl h-auto rounded-full transition-transform duration-300 hover:scale-105"
                style={{
                  boxShadow:
                    "0 0 12px rgba(0, 255, 65, 0.8), 0 0 24px rgba(0, 255, 65, 0.3)",
                }}
              />
            </div>

            {/* Title */}
            <h1
              className="title text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6 leading-tight mx-auto lg:mx-0 font-mono"
              style={{
                textShadow:
                  "0 0 8px rgba(0, 255, 65, 0.6), 0 0 16px rgba(0, 255, 65, 0.2)",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: heroData.title }}></span>
              <span className="typewriter-cursor"></span>
            </h1>

            {/* Subtitle */}
            <h3 className="subtitle text-xl md:text-2xl font-medium tracking-wide text-[#00ff41] -mt-5 pb-4">
              {heroData.subtitle}
            </h3>

            {/* Status */}
            {heroData.isAvailable ? (
              <a
                href={heroData.status.available.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff41]/30 text-[#00ff41] font-semibold uppercase tracking-wider rounded-lg font-mono text-sm transition-all duration-300 hover:bg-[#00ff41]/10 hover:border-[#00ff41] cursor-pointer mb-4 mt-4"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 65, 0.2)" }}
              >
                {getIcon(heroData.status.available.icon)}
                {heroData.status.available.label}
              </a>
            ) : (
              <button
                className="px-4 py-2 border border-red-500 text-red-500 font-semibold uppercase tracking-widest rounded-lg font-mono text-sm cursor-not-allowed mb-4 mt-4"
                disabled
              >
                {heroData.status.busy.label}
              </button>
            )}

            {/* Description */}
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6 font-sans">
              <span
                dangerouslySetInnerHTML={{ __html: heroData.description }}
              />
            </p>

            <div className="lg:w-150 md:w-150 mx-auto lg:mx-0 mb-6 pb-5">
              <Divider />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center mb-6 ">
              {heroData.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (button.label === "Get In Touch!") {
                      setIsContactFormOpen(true);
                    } else {
                      window.open(
                        button.href,
                        button.label === "CV" ? "_blank" : "_self",
                      );
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-[#00ff41]/30 text-[#00ff41] font-semibold uppercase tracking-widest rounded-lg font-mono text-xs transition-all duration-300 hover:bg-[#00ff41]/10 hover:border-[#00ff41] cursor-pointer"
                  style={{ boxShadow: "0 0 10px rgba(0, 255, 65, 0.2)" }}
                >
                  {button.icon && getIcon(button.icon)}
                  {button.label}
                </button>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start pt-4 items-center flex-wrap">
              {heroData.socialLinks.map((socialLink) => (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  className="inline-flex items-center justify-center w-12 h-12 p-3 bg-transparent border border-neutral-800 rounded-lg text-green-300 transition-all duration-300 hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5"
                  style={{ boxShadow: "0 0 8px rgba(0, 255, 65, 0.1)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialLink.image ? (
                    <img
                      src={socialLink.image}
                      alt={socialLink.label}
                      loading="lazy"
                      className="w-5 h-5"
                    />
                  ) : socialLink.icon && socialLink.icon.startsWith('/') ? (
                    <img
                      src={socialLink.icon}
                      alt={socialLink.label}
                      loading="lazy"
                      className="w-5 h-5"
                    />
                  ) : (
                    socialLink.icon && getIcon(socialLink.icon)
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Avatar - Desktop */}
          <div className="hero-icon-right hidden lg:flex relative w-64 h-64 lg:w-80 lg:h-80 items-center justify-center shrink-0">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0, 255, 65, 0.8) 0%, rgba(0, 255, 65, 0.1) 100%)",
                filter: "blur(30px)",
                opacity: 0.5,
                animation: "pulse-halo 3s ease-in-out infinite",
              }}
            ></div>
            <img
              src="/images/hacker.gif"
              alt="Hacker Icon"
              className="relative z-10 w-auto max-w-[80%] h-auto rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow:
                  "0 0 12px rgba(0, 255, 65, 0.8), 0 0 24px rgba(0, 255, 65, 0.3)",
              }}
            />
          </div>
        </div>
      </div>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </section>
  );
}
