"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus, ExternalLink, Github, Star } from "lucide-react"
import { ProjectForm } from "./project-form"
import { deleteProject } from "@/lib/admin-actions"

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

interface ProjectsTableProps {
  projects: Project[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const result = await deleteProject(id)
      if (result.error) {
        alert(result.error)
      }
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  if (showForm) {
    return <ProjectForm project={editingProject || undefined} onCancel={handleCancel} onSuccess={handleFormSuccess} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-gradient">Project Management</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground silver-glow"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card/50 border-silver/20 silver-glow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                    {project.featured && (
                      <Badge className="bg-silver/20 text-silver border-silver/30">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(project)}
                    className="border-silver/30 text-silver hover:bg-silver/10 bg-transparent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(project.id, project.title)}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-silver/10 text-silver border-silver/20 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 text-sm">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-silver hover:text-silver-light transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Demo
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-silver hover:text-silver-light transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    Code
                  </a>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <Card className="bg-card/50 border-silver/20">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No projects found. Create your first project to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
