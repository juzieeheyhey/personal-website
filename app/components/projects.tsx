"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import GitHub from "@/public/github-mark.png"

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "machine learning", "web"]

  const GitHubIcon = GitHub.src;

  const projects = [
    {
      id: 1,
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
      id: 2,
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
    // {
    //   id: 3,
    //   title: "tech dashboard",
    //   category: "web",
    //   image: "/placeholder.svg?height=400&width=600",
    //   year: "2024",
    //   description: "an analytics dashboard with real-time data visualization and customizable widgets.",
    //   links: {
    //     demo: "#",
    //     github: "#",
    //   },
    // },
    // {
    //   id: 4,
    //   title: "mobile experience",
    //   category: "mobile",
    //   image: "/placeholder.svg?height=400&width=600",
    //   year: "2023",
    //   description:
    //     "a cross-platform mobile app built with react native featuring offline capabilities and smooth animations.",
    //   links: {
    //     demo: "#",
    //     github: "#",
    //   },
    // },
    // {
    //   id: 5,
    //   title: "neural network visualizer",
    //   category: "ai",
    //   image: "/placeholder.svg?height=400&width=600",
    //   year: "2024",
    //   description: "an interactive tool for visualizing neural networks and understanding machine learning concepts.",
    //   links: {
    //     demo: "#",
    //     github: "#",
    //   },
    // },
    // {
    //   id: 6,
    //   title: "ar mobile app",
    //   category: "mobile",
    //   image: "/placeholder.svg?height=400&width=600",
    //   year: "2023",
    //   description: "an augmented reality application that overlays digital information on the physical world.",
    //   links: {
    //     demo: "#",
    //     github: "#",
    //   },
    // },
  ]

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "all" ? true : project.category === selectedCategory,
  )

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-medium tracking-tight lowercase mb-4 text-center text-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          projects
        </motion.h2>

        <motion.p
          className="text-zinc-600 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          a selection of my recent work across different technologies.
        </motion.p>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm lowercase ${selectedCategory === category ? "bg-violet-400 hover:bg-violet-500" : "border-violet-200 text-violet-600 hover:bg-violet-100"}`}
            >
              {category}
            </Button>
          ))}
        </div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-violet-100 shadow-md shadow-violet-100/50 h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-violet-400/90 text-white text-xs px-2 py-1 rounded-full">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-medium text-zinc-800 lowercase mb-2">{project.title}</h3>
                      <p className="text-zinc-600 text-sm mb-4 flex-grow">{project.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-xs text-violet-500">{project.year}</span>
                        <div className="flex gap-3">
                          {project.links.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" >
                              <img
                                src={GitHubIcon}
                                alt="GitHub"
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  transition: 'transform 0.2s',
                                }}
                                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1.0)')}
                              />
                            </a>
                          )}
                          {project.links.demo && (
                            <a
                              href={project.links.demo}
                              className="text-zinc-600 hover:text-violet-500 transition-colors"
                              aria-label="View live demo"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
