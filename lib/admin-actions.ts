"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProject(prevState: any, formData: FormData) {
  const supabase = createClient()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const long_description = formData.get("long_description") as string
  const technologies = formData.get("technologies") as string
  const image_url = formData.get("image_url") as string
  const demo_url = formData.get("demo_url") as string
  const github_url = formData.get("github_url") as string
  const featured = formData.get("featured") === "on"

  if (!title || !description || !technologies) {
    return { error: "Title, description, and technologies are required" }
  }

  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean)

  try {
    const { error } = await supabase.from("projects").insert({
      title,
      description,
      long_description,
      technologies: technologiesArray,
      image_url: image_url || null,
      demo_url: demo_url || null,
      github_url: github_url || null,
      featured,
    })

    if (error) throw error

    revalidatePath("/admin")
    return { success: "Project created successfully!" }
  } catch (error) {
    console.error("Error creating project:", error)
    return { error: "Failed to create project. Please try again." }
  }
}

export async function updateProject(prevState: any, formData: FormData) {
  const supabase = createClient()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const long_description = formData.get("long_description") as string
  const technologies = formData.get("technologies") as string
  const image_url = formData.get("image_url") as string
  const demo_url = formData.get("demo_url") as string
  const github_url = formData.get("github_url") as string
  const featured = formData.get("featured") === "on"

  if (!id || !title || !description || !technologies) {
    return { error: "ID, title, description, and technologies are required" }
  }

  const technologiesArray = technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean)

  try {
    const { error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        long_description,
        technologies: technologiesArray,
        image_url: image_url || null,
        demo_url: demo_url || null,
        github_url: github_url || null,
        featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error

    revalidatePath("/admin")
    return { success: "Project updated successfully!" }
  } catch (error) {
    console.error("Error updating project:", error)
    return { error: "Failed to update project. Please try again." }
  }
}

export async function deleteProject(id: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/admin")
    return { success: "Project deleted successfully!" }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { error: "Failed to delete project. Please try again." }
  }
}
