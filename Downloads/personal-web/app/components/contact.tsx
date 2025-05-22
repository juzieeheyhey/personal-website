"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-purple-500 lowercase sm:text-4xl text-zinc-800">get in touch</h2>
          <p className="mb-8 text-zinc-600">
            interested in collaborating on a tech project? contact me.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <div className="mt-16 md:mt-24">
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-6">
                <Link
                  href="https://github.com/juzieeheyhey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-500 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/tram-nguyen-jessica/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-500 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </Link>
                <Link
                  href="mailto:jessica.ng0604@gmail.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-purple-500 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
