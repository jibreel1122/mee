"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Save, X } from "lucide-react"
import { createProject, updateProject } from "@/lib/admin-actions"

interface Project {
  id?: string
  title: string
  description: string
  long_description: string
  technologies: string[]
  image_url: string
  demo_url: string
  github_url: string
  featured: boolean
}

interface ProjectFormProps {
  project?: Project
  onCancel: () => void
  onSuccess?: () => void
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-primary/90 text-primary-foreground silver-glow"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isEdit ? "Updating..." : "Creating..."}
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          {isEdit ? "Update Project" : "Create Project"}
        </>
      )}
    </Button>
  )
}

export function ProjectForm({ project, onCancel, onSuccess }: ProjectFormProps) {
  const isEdit = !!project
  const action = isEdit ? updateProject : createProject
  const [state, formAction] = useActionState(action, null)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(project?.image_url || "")
  const [uploading, setUploading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadFile = async () => {
    if (!imageFile) return null

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", imageFile)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Upload error:", error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    if (uploadMethod === "file" && imageFile) {
      const uploadedUrl = await uploadFile()
      if (uploadedUrl) {
        formData.set("image_url", uploadedUrl)
      }
    }
    return formAction(formData)
  }

  // Handle success
  if (state?.success && onSuccess) {
    onSuccess()
  }

  return (
    <Card className="bg-card/50 border-silver/20 silver-glow">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-gradient">
          {isEdit ? "Edit Project" : "Add New Project"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {isEdit && <input type="hidden" name="id" value={project.id} />}

          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {state.error}
            </div>
          )}

          {state?.success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
              {state.success}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-silver">
                Title *
              </label>
              <Input
                id="title"
                name="title"
                defaultValue={project?.title || ""}
                required
                className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                placeholder="Project title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="technologies" className="text-sm font-medium text-silver">
                Technologies * (comma-separated)
              </label>
              <Input
                id="technologies"
                name="technologies"
                defaultValue={project?.technologies.join(", ") || ""}
                required
                className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                placeholder="React, Next.js, TypeScript"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-silver">
              Short Description *
            </label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description || ""}
              required
              rows={3}
              className="bg-background/50 border-silver/30 focus:border-silver text-foreground resize-none"
              placeholder="Brief project description"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="long_description" className="text-sm font-medium text-silver">
              Detailed Description
            </label>
            <Textarea
              id="long_description"
              name="long_description"
              defaultValue={project?.long_description || ""}
              rows={5}
              className="bg-background/50 border-silver/30 focus:border-silver text-foreground resize-none"
              placeholder="Detailed project description with features and technical details"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-silver">Project Image</label>

            <div className="flex gap-4 mb-4">
              <Button
                type="button"
                variant={uploadMethod === "url" ? "default" : "outline"}
                size="sm"
                onClick={() => setUploadMethod("url")}
                className="text-xs"
              >
                URL
              </Button>
              <Button
                type="button"
                variant={uploadMethod === "file" ? "default" : "outline"}
                size="sm"
                onClick={() => setUploadMethod("file")}
                className="text-xs"
              >
                Upload File
              </Button>
            </div>

            {uploadMethod === "url" ? (
              <Input
                id="image_url"
                name="image_url"
                type="url"
                defaultValue={project?.image_url || ""}
                onChange={(e) => setImagePreview(e.target.value)}
                className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                placeholder="https://example.com/image.jpg"
              />
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-background/50 border-silver/30 focus:border-silver text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </div>
                  )}
                </div>
                <input type="hidden" name="image_url" value={imagePreview} />
              </div>
            )}

            {imagePreview && (
              <div className="mt-3">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-silver/30">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="demo_url" className="text-sm font-medium text-silver">
                Demo URL
              </label>
              <Input
                id="demo_url"
                name="demo_url"
                type="url"
                defaultValue={project?.demo_url || ""}
                className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                placeholder="https://demo.example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="github_url" className="text-sm font-medium text-silver">
                GitHub URL
              </label>
              <Input
                id="github_url"
                name="github_url"
                type="url"
                defaultValue={project?.github_url || ""}
                className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              name="featured"
              defaultChecked={project?.featured || false}
              className="border-silver/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-silver">
              Featured Project
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <SubmitButton isEdit={isEdit} />
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-silver/30 text-silver hover:bg-silver/10 bg-transparent"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
