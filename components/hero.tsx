"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpCircle, Download, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="pt-10 pb-20 md:pt-16 md:pb-32 flex flex-col items-center justify-center min-h-[90vh]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-primary/40 shadow-[0_0_30px_rgba(236,168,154,0.35)] sm:h-64 sm:w-64">
            <Image
              src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/6a015c1d698a03eea736315d_d0535adc4d0fd4cb97324be68410a744_ChatGPT%20Image%20May%2011%2C%202026%2C%2009_56_26%20AM.png"
              alt="Rudrika Panigrahi"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 600px) 220px, 252px"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Hi, I&apos;m <span className="gradient-text">Rudrika Panigrahi</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
              <span className="js-only">
                <span>Full-Stack Developer & AI/ML Engineer</span>
              </span>
              <noscript>
                <span>Full-Stack Developer | AI/ML Engineer | B.Tech Computer Science</span>
              </noscript>
            </p>
          </div>
          <div className="max-w-[700px] text-muted-foreground">
            <p className="text-lg">I build scalable web applications and AI-powered systems — React frontends, FastAPI backends, vector databases, and multi-agent pipelines. Open to internships & full-time roles.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild size="lg" className="rounded-full bg-[#c88a7d] text-white hover:bg-[#b67b6f]">
              <Link href="#contact">Get In Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a
                href="https://drive.google.com/file/d/1TM2QYqisZyOxrg4Y-I8WAi2ulSEeJWLO/view?usp=sharing"

                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary/40 hover:border-primary hover:bg-primary/5 gap-2"
              onClick={() => {
                // Dispatch custom event — ChatWidget listens for this to open
                window.dispatchEvent(new CustomEvent('open-portfolio-chat'))
              }}
            >
              <span className="text-base">✨</span> Ask AI about me
            </Button>
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/rudrika08" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/rudrika-panigrahi-6085b5268/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:rudrika.812@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block js-only">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <ArrowUpCircle className="h-10 w-10 text-primary animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}
