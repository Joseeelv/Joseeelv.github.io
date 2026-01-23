import Hero from "../components/hero";
import Projects from "../components/projects";
import About from "../components/whoami";
import ExperienceEducation from "../components/experience-education";
import Skills from "../components/skills";
import Articles from "../components/articles";
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <ExperienceEducation />
      <Skills />
      <Articles />
    </>
  );
}
