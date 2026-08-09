export const heroData = {
  title: "Hey, I'm Jose Luis",
  subtitle: "Junior Software Engineer & Cybersecurity Researcher",
  description:"Experienced in <em>web application development</em> and <em>cybersecurity</em>, focussing on creating secure and efficient software solutions.",

  isAvailable: true, // Change this to false if you want to show the "Busy" status instead of "Open to Work"

  status: {
    available: {
      label: "Open to Work",
      icon: "Linkedin",
      href: "https://www.linkedin.com/in/jose-luis-venega-sánchez-817a65285",
      borderColor: "green-900",
      textColor: "text-green-400",
      bgColor: "bg-green-500",
    },
    busy: {
      label: "Busy",
      borderColor: "red-500",
      textColor: "text-red-500",
      bgColor: "bg-red-500",
    },
  },
  buttons: [
    {
      label: "Get In Touch!",
      icon: "Mail",
    },
    {
      label: "CV",
      href: "/files/Jose Luis Venega Sánchez.pdf",
      icon: "Download",
    },
  ],
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jose-luis-venega-sánchez-817a65285",
      icon: "Linkedin",
    },
    {
      label: "GitHub",
      href: "https://www.github.com/Joseeelv",
      icon: "Github",
    },
    {
      label: "TryHackMe",
      href: "https://tryhackme.com/p/joseelv",
      image: "/images/thm.svg",
    },
  ],
};