export const blogData = {
  sectionTitle: "Pentesting Labs & Write-ups",
  blogs: [
    {
      title: "code",
      description: "A detailed walkthrough of the Hack The Box machine \"Code,\" showcasing techniques such as Python code exploitation, database extraction, hash cracking, and privilege escalation to capture both user and root flags.",
      image: "/images/Rooms/HTB/Code/1.png",
      url: "https://app.hackthebox.com/machines/653",
      content: "Code",
      difficulty: "Easy",
      category: "Web",
      skills:["Python code exploitation","Database extraction","Hash cracking","Privilege escalation","Path traversal"],
      os: "Linux",
    },
    {
      title: "LinkVortex",
      description: "LinkVortex machine from Hack The Box. The process includes port scanning, web technology identification, fuzzing for hidden directories, exploiting vulnerabilities in Ghost CMS (CVE-2023-40028), and privilege escalation through the clean_symlink.sh script. The final goal was to escalate privileges and capture the root flag.",
      image: "/images/Rooms/HTB/LinkVortex/LinkVortex.png",
      url: "https://app.hackthebox.com/machines/LinkVortex",
      content: "LinkVortex",
      difficulty: "Easy",
      category: "Web",
      skills: [".git directory enumeration","CVE-2023-40028 exploitation"],
      os: "Linux",
    },
  ],
};