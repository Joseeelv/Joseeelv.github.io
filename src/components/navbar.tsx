import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "projects",
        "whoami",
        "experience-education",
        "skills",
        "articles",
        "blog",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      const targetId = href.substring(1);

      // Si no estamos en la página principal, navega a "/" primero
      if (location.pathname !== "/") {
        navigate("/");
        // Espera a que la página cargue antes de hacer scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const navbarHeight = 64;
            const elementPosition =
              element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 300);
      } else {
        // Si ya estamos en la página principal, solo hace scroll
        const element = document.getElementById(targetId);
        if (element) {
          const navbarHeight = 64;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }

      // Cerrar menú en móviles después de hacer clic
      setIsMenuOpen(false);
    } else if (href?.startsWith("/")) {
      // Navegación a rutas
      navigate(href);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "Whoami", href: "#whoami" },
    { label: "Experience & Education", href: "#experience-education" },
    { label: "Skills", href: "#skills" },
    { label: "Articles", href: "#articles" },
    { label: "Labs", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-gray-700 shadow-lg font-display px-8 h-16">
      <div className="max-w mx-auto w-full flex items-center justify-center h-full gap-12">
        {/* Brand */}
        <div className="flex items-center absolute left-8">
          <a className="flex items-center" href="/">
            <img
              src="/images/favicon.png"
              alt="Site Icon"
              className="w-10 h-10 rounded-xl"
            />
          </a>
        </div>

        {/* Burger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-800 rounded-lg transition-colors absolute right-8 cursor-pointer"
        >
          <span
            className={`w-6 h-0.5 bg-white block transition-all duration-300 cursor-pointer ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white block transition-all duration-300 cursor-pointer ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white block transition-all duration-300 cursor-pointer ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-6 font-bold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={`tracking-wide text-base transition-colors cursor-pointer ${
                activeSection === link.href.substring(1)
                  ? "shadow-md active cursor-default"
                  : "text-gray-200 hover:shadow-md"
              }`}
              href={link.href}
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-16 bg-slate-900 border-t border-gray-700 shadow-2xl">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={`px-6 py-3 border-b border-gray-800 tracking-wide text-base font-semibold transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "text-gray-300 hover:bg-gray-800/50"
                }`}
                href={link.href}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
