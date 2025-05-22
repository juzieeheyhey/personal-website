"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const scrollY = window.scrollY

      // Set isScrolled state for styling
      setIsScrolled(scrollY > 50)

      // Get all sections
      const sections = ["hero", "experience", "projects", "contact"]
      const sectionElements = sections.map(id => document.getElementById(id))

      // Find the current active section
      // Start from the bottom of the page (contact) and work upwards
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section) {
          // For the contact section, we need special handling since it might be shorter
          if (sections[i] === "contact") {
            // If we're near the bottom of the page, activate contact section
            if (window.innerHeight + scrollY >= document.body.offsetHeight - 100) {
              setActiveSection("contact")
              break
            }
          }

          // For other sections, check if we're within their bounds
          if (scrollPosition >= section.offsetTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.nav
      className={`fixed right-8 top-8 z-50 flex items-center justify-end space-x-8 rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {["experience", "projects", "contact"].map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`relative text-sm font-medium lowercase transition-colors ${activeSection === section
            ? "text-violet-500"
            : isScrolled
              ? "text-zinc-600 hover:text-violet-500"
              : "text-zinc-700 hover:text-violet-500"
            }`}
          aria-label={`Scroll to ${section} section`}
        >
          {section}
          {activeSection === section && (
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 w-full bg-violet-500"
              layoutId="activeSection"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.nav>
  )
}
