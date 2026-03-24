"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

// Updated nav items - removed Skills as it's now part of Experience
const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  // { name: "Blog", href: "#blog" },
  { name: "Contact Me", href: "#contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Function to determine which section is currently in view
  const determineActiveSection = useCallback(() => {
    const sections = navItems.map((item) => item.href.substring(1))

    // Add the sections that are not in the navbar but still need to be detected
    const allSections = [...sections, "open-source", "skills"]

    // Find the section that is currently in view
    for (let i = allSections.length - 1; i >= 0; i--) {
      const section = document.getElementById(allSections[i])
      if (section) {
        const rect = section.getBoundingClientRect()
        const triggerPoint = window.innerHeight * 0.3

        // If the section is in the viewport (with some buffer for better UX)
        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          // Map to the closest navbar item if it's not in the navbar
          const sectionId = allSections[i]
          if (sectionId === "open-source") return "projects"
          if (sectionId === "skills") return "experience"
          if (!sections.includes(sectionId)) return "home"
          return sectionId
        }
      }
    }

    // Default to home if no section is in view
    return "home"
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      setActiveSection(determineActiveSection())
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    setActiveSection(determineActiveSection())

    return () => window.removeEventListener("scroll", handleScroll)
  }, [determineActiveSection])

  // Smooth scroll to section when clicking nav items
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (typeof window === "undefined") return

    const targetId = href.substring(1)
    const scrollAfterLayoutSettles = () => {
      const element = document.getElementById(targetId)
      if (!element) return

      const offset = window.innerWidth >= 768 ? 80 : 64
      const top = element.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top,
        behavior: "smooth",
      })

      // Keep URL hash in sync without triggering default jump.
      window.history.replaceState(null, "", href)
      setActiveSection(targetId)
    }

    if (isOpen) {
      setIsOpen(false)
      setTimeout(scrollAfterLayoutSettles, 220)
      return
    }

    scrollAfterLayoutSettles()
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/70 backdrop-blur-lg shadow-sm border-b border-border/50" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/50 shadow-[0_0_10px_rgba(236,168,154,0.35)]">
              <Image src="/profile.png" alt="Rudrika Panigrahi" fill className="object-cover" sizes="36px" />
            </div>
            <span className="text-xl font-bold gradient-text">RP</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative flex space-x-4 items-center">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Link
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={cn(
                      "text-sm font-medium transition-colors px-3 py-2 rounded-md relative",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="underline"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="relative"
          >
            <motion.div
              initial={false}
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container py-4 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors py-2 px-3 rounded-md",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
