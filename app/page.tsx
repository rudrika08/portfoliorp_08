import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
// import Blog from "@/components/blog"
import Contact from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rudrika Panigrahi | Full-Stack Developer & AI/ML Enthusiast",
  description:
    "Portfolio of Rudrika Panigrahi, a B.Tech Computer Science student and Full-Stack Developer. Explore projects, experience, and skills in web development and AI/ML.",
}

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      {/* <Blog /> */}
      <Contact />
    </div>
  )
}
