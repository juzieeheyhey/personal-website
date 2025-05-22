"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullText = "hi there,"
  const typingSpeed = 130

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    const pauseTime = 5000
    const type = () => {
      if (!isDeleting) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++

        if (currentIndex > fullText.length) {
          // Pause before deleting
          isDeleting = true
          setTimeout(type, pauseTime)
        } else {
          setTimeout(type, typingSpeed)
        }
      } else {
        // Deleting backward
        currentIndex--
        setTypedText(fullText.slice(0, currentIndex))

        if (currentIndex === 0) {
          // Pause before typing again
          isDeleting = false
          setTimeout(type, pauseTime / 10)
        } else {
          setTimeout(type, typingSpeed / 2) // faster deleting
        }
      }
    }
    type()
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2.5 - 1.25
        this.speedY = Math.random() * 2.5 - 1.25

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
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
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

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row items-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 to-blue-100/30 animate-gradient"></div>

      {/* Left side with typing effect */}
      <div className="relative z-10 w-full md:w-1/3 h-full flex items-center justify-center px-8 py-20 md:py-0">
        <div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-violet-500 mb-8 min-h-[96px]">
            {typedText}
            <span className="inline-block w-[4px] h-[60px] bg-violet-500 ml-2 animate-blink"></span>
          </h1>
        </div>
      </div>

      {/* Right side with introduction */}
      <div className="relative z-10 w-full md:w-2/3 h-full flex items-center justify-center px-8 py-20 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          <h2 className="text-2xl md:text35xl font-medium tracking-tight lowercase mb-2">i'm</h2>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight lowercase mb-2 text-violet-500">
            jessica nguyen
          </h2>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight lowercase mb-6 text-zinc-600 ">
            software developer
          </h3>

          <p className=" text-zinc-600 mb-6 leading-relaxed">
            originally from Vietnam, i'm a passionate computer science student at Boston University and an aspriring software developer currently based in Boston. with hands-on experience in full-stack development and a strong interest in AI/ML, i enjoy learning new technologies and collaborating with others to create meaningful impact.
          </p>

          <p className="text-zinc-600 mb-8 leading-relaxed">
            outside of tech, i'm a home café enthusiast—i enjoy making espresso and matcha. here's my hot take: i actually don't like hot drinks!
          </p>

          <div className="flex gap-4 text-sm text-violet-500">
            <a href="/resume.pdf" className="flex items-center gap-1 hover:text-violet-700 transition-colors" target="_blank" rel="noopener noreferrer">
              view resume <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
