export const heroData = {
  title: "Hey, I'm Jose Luis",
  subtitle: "Computer Engineering Student",
  description:"Experienced in <em>web application development</em> and <em>cybersecurity</em>, focussing on creating secure and efficient software solutions.",
  
  // Cambia este valor a true cuando estés ocupado
  isAvailable: true,
  
  status: {
    available: {
      label: "Open to Work",
      icon: "fab fa-linkedin",
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
      icon: "fas fa-envelope",
    },
    {
      label: "CV",
      href: "/files/JoseLuisVenegaSánchez.pdf",
      icon: "fas fa-download",
    },
  ],
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jose-luis-venega-sánchez-817a65285",
      icon: "fab fa-linkedin",
    },
    {
      label: "GitHub",
      href: "https://www.github.com/Joseeelv",
      icon: "fab fa-github",
    },
    {
      label: "TryHackMe",
      href: "https://tryhackme.com/p/joseelv",
      image: "/images/thm.svg",
    },
  ],
};
