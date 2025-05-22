import Hero from "./components/hero"
import Contact from "./components/contact"
import Footer from "./components/footer"
import Experience from "./components/experience"
import Projects from "./components/projects"
import Navigation from "./components/navigation"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-zinc-800">
      <Navigation />
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
      <section id="experience" className="min-h-screen">
        <Experience />
      </section>
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
      <section id="contact" className="container mx-auto px-4 py-16 min-h-[50vh]">
        <Contact />
      </section>
      <Footer />
    </main >
  )
}
