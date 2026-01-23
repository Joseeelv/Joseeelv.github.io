import { useState } from "react";
import Divider from "./divider";
import ContactForm from "./contactForm";
import { heroData } from "../data/heroData";

export default function Hero() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  return (
    <section
      className="relative w-full min-h-screen bg-slate-950 text-gray-200 flex items-center pt-16"
      id="hero"
    >
      {/* Binary diagonal background effect */}
      <div className="binary-diagonal absolute inset-0 opacity-[0.03] z-0 pointer-events-none"></div>

      {/* Hero body container */}
      <div className="hero-body relative z-10 w-full flex flex-col items-center py-20">
        {/* Hero flex wrapper */}
        <div className="hero-flex flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 gap-12 lg:gap-8 w-full">
          {/* Text content container */}
          <div className="container w-full max-w-2xl lg:max-w-none lg:w-auto md:w-auto px-4 sm:px-6 text-center lg:text-left flex-1">
            {/* Hero icon (Avatar with halo effect) - Mobile */}
            <div className="hero-icon-right flex lg:hidden relative w-40 h-40 sm:w-56 sm:h-56 items-center justify-center shrink-0 mb-8 mx-auto">
              {/* Glowing halo effect */}
              <div
                className="icon-halo absolute inset-0 rounded-full z-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0, 224, 255, 1) 0%, rgba(0, 255, 153, 1) 100%)",
                  filter: "blur(30px)",
                  opacity: 0.6,
                  animation: "pulse-halo 3s ease-in-out infinite",
                }}
              ></div>

              {/* Avatar image */}
              <img
                src="/images/hacker.gif"
                alt="Hacker Icon"
                loading="lazy"
                className="relative z-10 w-auto max-w-1xl h-auto rounded-full transition-transform duration-300 hover:scale-105"
                style={{
                  boxShadow:
                    "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 255, 153, 1)",
                }}
              />
            </div>

            {/* Hero title */}
            <h1
              className="title text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-wider text-white drop-shadow-lg mb-6 leading-tight mx-auto lg:mx-0"
              style={{
                textShadow:
                  "0 0 10px rgba(0, 224, 255, 0.9), 0 0 20px rgba(0, 224, 255, 0.5)",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: heroData.title }}></span>
            </h1>

            {/* Hero subtitle */}
            <h3 className="subtitle text-1xl md:text-2xl lg:text-2xl uppercase font-medium tracking-wide bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent -mt-5 pb-4">
              {heroData.subtitle}
            </h3>
            {heroData.isAvailable ? (
              <a
                href={heroData.status.available.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 border-2 border-${heroData.status.available.borderColor} ${heroData.status.available.textColor} font-semibold uppercase tracking-wide rounded-full transition-all duration-300 inline-block hover:scale-105 cursor-pointer mb-4 mt-4`}
                style={{ boxShadow: "0 0 10px rgba(0, 224, 255, 0.6)" }}
              >
                <i className={`${heroData.status.available.icon} mr-2`}></i>
                {heroData.status.available.label}
              </a>
            ) : (
              <button
                className={`px-4 py-2 border-2 border-red-500 text-red-500 font-semibold uppercase tracking-wide rounded-full cursor-not-allowed mb-4 mt-4`}
                disabled
              >
                {heroData.status.busy.label}
              </button>
            )}

            {/* Description text */}
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6">
              <span
                dangerouslySetInnerHTML={{ __html: heroData.description }}
              ></span>
            </p>

            <div className="lg:w-150 md:w-150 items-center mx-auto lg:mx-0 mb-6">
              <Divider />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center mb-6">
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
                  className="hero-button px-6 sm:px-8 py-3 border-2 border-cyan-400 text-white font-semibold uppercase tracking-widest rounded-full transition-all duration-300 inline-block hover:scale-105 cursor-pointer"
                  style={{ boxShadow: "0 0 10px rgba(0, 224, 255, 0.6)" }}
                >
                  {button.icon && <i className={`${button.icon} mr-2`}></i>}
                  {button.label}
                </button>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start pt-4 items-center flex-wrap">
              {heroData.socialLinks.map((socialLink) => (
                <a
                  href={socialLink.href}
                  className="contact-btn inline-flex items-center justify-center w-12 h-12 p-3 bg-transparent border border-gray-500 rounded-full text-cyan-400 transition-all duration-300 hover:scale-110"
                  style={{ boxShadow: "0 0 8px rgba(0, 224, 255, 0.4)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialLink.image ? (
                    <img
                      src={socialLink.image}
                      alt={socialLink.label}
                      loading="lazy"
                      className="w-6 h-6"
                    />
                  ) : (
                    <i className={socialLink.icon}></i>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Hero icon (Avatar with halo effect) - Desktop */}
          <div className="hero-icon-right hidden lg:flex relative w-64 h-64 lg:w-80 lg:h-80 items-center justify-center shrink-0">
            {/* Glowing halo effect */}
            <div
              className="icon-halo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0, 224, 255, 1) 0%, rgba(0, 255, 153, 1) 100%)",
                filter: "blur(30px)",
                opacity: 0.6,
                animation: "pulse-halo 3s ease-in-out infinite",
              }}
            ></div>

            {/* Avatar image */}
            <img
              src="/images/hacker.gif"
              alt="Hacker Icon"
              loading="lazy"
              className="relative z-10 w-auto max-w-[80%] h-auto rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                boxShadow:
                  "0 0 10px rgba(0, 224, 255, 1), 0 0 20px rgba(0, 255, 153, 1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </section>
  );
}
