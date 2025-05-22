"use client"

import { motion } from "framer-motion"

export default function Experience() {
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
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-medium tracking-tight lowercase mb-12 text-center text-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-violet-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-violet-400 border-4 border-violet-100"></div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-violet-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-zinc-800 lowercase">{exp.role}</h3>
                      <span className="text-sm text-violet-500 lowercase">{exp.period}</span>
                    </div>
                    <p className="text-violet-500 mb-3 lowercase">{exp.company}</p>
                    <p className="text-zinc-600 mb-4 text-sm">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded-full lowercase"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
