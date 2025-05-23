"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll animation controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [30, 0, 0, -30])

  const experiences = [
    {
      id: 1,
      role: "teaching assistant",
      company: "boston university department of computer science",
      period: "2023 - present",
      description:
        "facilitate weekly discussion, hold office hours to assist students with analytical and programming assignments, work closely with professors and staff members to design course materials including weekly assignments, exams, and lab exercises.",
      skills: ["python", "communication"],
    },
    {
      id: 2,
      role: "software engineer intern",
      company: "fpt software ho chi minh",
      period: "jun-aug, 2024",
      description:
        "built and maintained an employee performance evaluation web app tool with react frontend and django backend. collaborated with team members to implement user interfaces and improve user experience. ",
      skills: ["react", "django", "postgres"],
    },
    {
      id: 3,
      role: "software engineer intern",
      company: "gmd protocol",
      period: "jun-aug, 2023",
      description:
        "developed an automated hourly news updates telegram chatbot using python and telegram API, deployed smart contracts with solidity",
      skills: ["python", "solidity"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100" id="experience">
      <motion.div ref={containerRef} style={{ opacity, scale, y }} className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-medium tracking-tight lowercase mb-12 text-center text-zinc-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line with animation */}
          <motion.div
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-violet-200"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true, margin: "-100px" }}
          ></motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline dot with animation */}
                <motion.div
                  className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-violet-400 border-4 border-violet-100"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                ></motion.div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-violet-100"
                    initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.85)",
                      transition: { duration: 0.2, type: "tween" }, // Faster, more immediate transition
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <motion.h3
                        className="text-lg font-medium text-zinc-800 lowercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        {exp.role}
                      </motion.h3>
                      <motion.span
                        className="text-sm text-violet-500 lowercase"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        {exp.period}
                      </motion.span>
                    </div>
                    <motion.p
                      className="text-violet-500 mb-3 lowercase"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {exp.company}
                    </motion.p>
                    <motion.p
                      className="text-zinc-600 mb-4 text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.6 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {exp.description}
                    </motion.p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full lowercase"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.2 + 0.7 + i * 0.1,
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(139, 92, 246, 0.2)",
                            color: "rgba(124, 58, 237, 1)",
                            transition: { duration: 0.1 }, // Very quick hover response
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
