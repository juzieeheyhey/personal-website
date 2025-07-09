"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import GitHub from "@/public/github-mark.png"

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Scroll animation controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50])

  const categories = ["all", "machine learning", "web"]

  const GitHubIcon = GitHub.src

  const projects = [
    {
      id: 1,
      title: "Language Detection with BERT",
      category: "machine learning",
      image: "/language-detection.png",
      year: "2025",
      description: "Fine-tuned a multilingual BERT model for language identification across 70+ languages and built a full-stack web app (FastAPI + React) for real-time text language detection.",
      links: {
        github: "https://github.com/juzieeheyhey/language-detection.git",
      }
    },
    {
      id: 2,
      title: "NOTO reproduction",
      category: "machine learning",
      image: "/noto.png",
      year: "2025",
      description: "As part of my research at BITLab, I reproduced the “Noto” experiment from Salido et al. (2025) to evaluate memorization vs. reasoning in large language models; built an inference pipeline using PyTorch and Hugging Face, and analyzed performance shifts on paraphrased prompts using accuracy and Cohen’s κ.",
      links: {
        github: "https://github.com/juzieeheyhey/llm_memorization_reasoning/tree/main/salido2025/noto_experiment",
      }
    },
    {
      id: 3,
      title: "Alzheimer's Diagnosis Predictions",
      category: "machine learning",
      image: "/alzheimer-diagnosis.png",
      year: "2025",
      description:
        "Built a classification model to predict Alzheimer's diagnosis outcomes using a Kaggle dataset by implementing two approaches: logistic regression and random forest.",
      links: {
        github: "https://github.com/juzieeheyhey/alzheimers_classification.git",
      },
    },
    {
      id: 4,
      title: "FoodByte",
      category: "web",
      image: "/foodbyte.png",
      year: "2024",
      description:
        "A fully responsive web application built with React and Firebase that integrates two external APIs to help users manage their grocery inventory, discover recipes based on available ingredients, and locate nearby grocery stores.",
      links: {
        demo: "https://drive.google.com/file/d/1bOQCpYQsK41-MaOwcIrJz9UD6BkTNK0D/view",
        github: "https://github.com/juzieeheyhey/FoodByte?tab=readme-ov-file",
      },
    },
    {
      id: 5,
      title: "SparkBites! Web App",
      category: "web",
      image: "/sparkbites.png",
      year: "2023",
      description:
        "Developed a full-stack web application for Boston University’s CS392 course using Next.js and Express (both in TypeScript), with PostgreSQL for data storage and JWT-based authentication. Key features include user signup/login, profile management, event browsing and filtering, and admin-approved event creation with image uploads. ",
      links: {
        github: "https://github.com/juzieeheyhey/web-development-project.git",
      },
    },
  ]

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "all" ? true : project.category === selectedCategory,
  )

  return (
    <section className="py-20" id="projects">
      <motion.div ref={containerRef} style={{ opacity, scale, y }} className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-medium tracking-tight lowercase mb-4 text-center text-zinc-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          projects
        </motion.h2>

        <motion.p
          className="text-zinc-600 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          a selection of my recent work across different technologies.
        </motion.p>

        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm lowercase ${selectedCategory === category ? "bg-violet-400 hover:bg-violet-500" : "border-violet-200 text-violet-600 hover:bg-violet-100"}`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredCard(project.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-violet-100 shadow-md shadow-violet-100/50 h-full flex flex-col transition-all duration-300">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.4 },
                        }}
                        initial={{ scale: 1 }}
                        animate={{
                          scale: hoveredCard === project.id ? 1.05 : 1,
                          transition: { duration: 0.4 },
                        }}
                      />
                      <motion.div
                        className="absolute top-2 right-2 bg-violet-400/90 text-white text-xs px-2 py-1 rounded-full"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: { delay: index * 0.1 + 0.2 },
                        }}
                      >
                        {project.category}
                      </motion.div>
                    </div>
                    <motion.div
                      className="p-5 flex flex-col flex-grow"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: index * 0.1 + 0.3 },
                      }}
                    >
                      <h3 className="text-xl font-medium text-zinc-800 lowercase mb-2">{project.title}</h3>
                      <p className="text-zinc-600 text-sm mb-4 flex-grow">{project.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <motion.span
                          className="text-xs text-violet-500"
                          animate={{
                            scale: hoveredCard === project.id ? 1.05 : 1,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {project.year}
                        </motion.span>
                        <div className="flex gap-3">
                          {project.links.github && (
                            <motion.a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <motion.img
                                src={GitHubIcon}
                                alt="GitHub"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                }}
                                whileHover={{
                                  scale: 1.2,
                                  transition: { duration: 0.2, type: "spring" },
                                }}
                              />
                            </motion.a>
                          )}
                          {project.links.demo && (
                            <motion.a
                              href={project.links.demo}
                              className="text-zinc-600 hover:text-violet-500 transition-colors"
                              aria-label="View live demo"
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink size={18} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
