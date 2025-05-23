"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "hi there,"
  const typingSpeed = 130

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])


  useEffect(() => {
    // Initial animation sequence
    const timeout1 = setTimeout(() => {
      startTypingAnimation()
    }, 500)

    const timeout2 = setTimeout(() => {
      setShowContent(true)
    }, 2000)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [])
  const startTypingAnimation = () => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    }

    // track mouse position
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })

    window.addEventListener("mouseout", () => {
      mouse.x = null
      mouse.y = null
    })

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      distance: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.distance = 0

        const colors = [
          "rgba(255, 182, 193, 0.7)",
          "rgba(173, 216, 230, 0.7)",
          "rgba(221, 160, 221, 0.7)",
          "rgba(176, 224, 230, 0.7)",
          "rgba(255, 218, 185, 0.7)",
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // mouse interaction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          this.distance = distance

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            const directionX = forceDirectionX * force * this.density
            const directionY = forceDirectionY * force * this.density

            this.x -= directionX
            this.y -= directionY
          }
          else {
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX
              this.x -= dx / 10
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY
              this.y -= dy / 10
            }
          }
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.shadowBlur = 0

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToExperience = () => {
    const experienceSection = document.getElementById("experience")
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row items-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 to-blue-100/30 animate-gradient"></div>

      {/* Left side with typing effect */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full md: w-1/3 h-full flex items-center justify-center px-8 py-20 md:py-0">
        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-violet-500 mb-8 min-h-[96px]"
          >
            {typedText}
            <span className="inline-block w-[4px] h-[60px] bg-violet-500 ml-2 animate-blink"></span>
          </motion.h1>
        </div>
      </motion.div>


      {/* Right side with introduction */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full md:w-2/3 h-full flex items-center justify-center px-8 py-20 md:py-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-xl"
        >
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight lowercase mb-2">i'm</h2>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight lowercase mb-2 text-violet-500">
            jessica nguyen
          </h2>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight lowercase mb-6 text-zinc-600">
            software developer
          </h3>

          <p className="text-zinc-600 mb-6 leading-relaxed">
            originally from Vietnam, i'm a passionate computer science student at Boston University and an aspriring software developer currently based in Boston. with hands-on experience in full-stack development and a strong interest in AI/ML, i enjoy learning new technologies and collaborating with others to create meaningful impact.
          </p>

          <p className="text-zinc-600 mb-8 leading-relaxed">
            outside of tech, i'm a home café enthusiast—i enjoy making espresso and matcha. here's my hot take: i actually don't like hot drinks!
          </p>

          <div className="flex justify-center gap-4 text-sm text-violet-500">
            <a href="#" className="flex items-center gap-1 hover:text-violet-700 transition-colors">
              view resume <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={scrollToExperience}
      >
        <span className="text-sm text-zinc-600 mb-2">scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ChevronDown size={20} className="text-violet-500" />
        </motion.div>
      </motion.div>
    </div>
  )
}
