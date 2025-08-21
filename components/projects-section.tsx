"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Star } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

interface Project {
  id: string
  title: string
  description: string
  long_description: string
  technologies: string[]
  image_url: string
  demo_url: string
  github_url: string
  featured: boolean
  created_at: string
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "featured">("all")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = filter === "featured" ? projects.filter((project) => project.featured) : projects

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-silver/10 rounded-lg w-64 mx-auto"></div>
              <div className="h-6 bg-silver/10 rounded-lg w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-36 h-36 border border-silver/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-silver/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gradient mb-6">{t("projects.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            {t("projects.subtitle")}
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground silver-glow"
                  : "border-silver/30 text-silver hover:bg-silver/10 bg-transparent"
              }
            >
              {t("projects.filter.all")} ({projects.length})
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
              className={
                filter === "featured"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground silver-glow"
                  : "border-silver/30 text-silver hover:bg-silver/10 bg-transparent"
              }
            >
              <Star className="w-4 h-4 mr-2" />
              {t("projects.filter.featured")} ({projects.filter((p) => p.featured).length})
            </Button>
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Card className="backdrop-blur-md bg-slate-900/20 dark:bg-slate-900/20 light:bg-amber-50/60 border-2 border-slate-600/50 dark:border-slate-600/50 light:border-amber-400/70 hover:border-slate-400/70 dark:hover:border-slate-400/70 light:hover:border-amber-500/90 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/20 dark:hover:shadow-slate-500/20 light:hover:shadow-amber-500/40 overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/20 dark:via-slate-400/20 light:via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                <div className="flex flex-col lg:flex-row relative z-10" style={{ height: "auto" }}>
                  <div
                    className="relative w-full lg:w-1/3 overflow-hidden"
                    style={{ height: "17vw", minHeight: "170px", maxHeight: "255px" }}
                  >
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-400/90 text-yellow-900 border-yellow-500/50 font-semibold">
                          <Star className="w-3 h-3 mr-1" />
                          {t("projects.badge.featured")}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent dark:from-blue-800/30"></div>
                  </div>

                  {/* Project Content - takes 2/3 of width on desktop */}
                  <CardContent className="flex-1 p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                          {project.long_description || project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-700 dark:text-green-300 border-green-400/30 dark:border-green-300/40 text-sm px-3 py-1 font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                      {project.demo_url && (
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                          asChild
                        >
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            {t("projects.button.demo")}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found for the selected filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
