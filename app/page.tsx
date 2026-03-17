import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
// import Blog from "@/components/blog"
import Contact from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rudrika Panigrahi | Aspiring SDE",
  description:
    "Portfolio of Rudrika Panigrahi, an aspiring Software Development Engineer. Explore my projects, experience, and skills in software development.",
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
