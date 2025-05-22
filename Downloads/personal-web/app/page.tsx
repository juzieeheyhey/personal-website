import Hero from "./components/hero"
import Contact from "./components/contact"
import Footer from "./components/footer"
import Experience from "./components/experience"
import Projects from "./components/projects"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-zinc-800">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
