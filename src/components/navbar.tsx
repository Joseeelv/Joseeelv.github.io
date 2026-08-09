import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Terminal, Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/blog")) {
      setActiveSection("blog");
      return;
    }

    setActiveSection("hero");

    const handleScroll = () => {
      const sections = [
        "hero",
        "projects",
        "whoami",
        "experience",
        "skills",
        "articles",
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
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      const targetId = href.substring(1);

      if (location.pathname !== "/") {
        navigate("/");
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

      setIsMenuOpen(false);
    } else if (href?.startsWith("/")) {
      navigate(href);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "Whoami", href: "#whoami" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Articles", href: "#articles" },
    { label: "Labs", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-100 backdrop-blur-md bg-black/50 rounded-lg border-b border-green-900 font-mono px-8 h-16">
      <div className="max-w mx-auto w-full flex items-center justify-center h-full gap-12">
        {/* Brand */}
        <div className="flex items-center absolute left-8">
          <a className="flex items-center" href="/">
            <img
              className="w-12 h-10 text-[#00ff41] transition-all duration-300 hover:scale-110 cursor-pointer "
              src="/images/logo.png"
              alt="Logo"
            />
          </a>
        </div>

        {/* Burger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded transition-colors absolute right-8 cursor-pointer"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-sm tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={`transition-colors cursor-pointer ${
                activeSection === link.href.substring(1)
                  ? "active cursor-default"
                  : "text-gray-300 hover:text-[#00ff41]"
              }`}
              href={link.href}
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-16 z-40 bg-black/95 backdrop-blur-xl border-t border-[#1a1a1a]">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={`px-6 py-3 border-b border-[#1a1a1a] tracking-wider text-sm font-mono font-semibold transition-all ${
                  activeSection === link.href.substring(1)
                    ? "bg-[#00ff41]/10 text-[#00ff41]"
                    : "text-gray-300 hover:bg-[#0a0a0a]"
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
