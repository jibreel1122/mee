import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, User, Settings, FolderOpen } from "lucide-react"
import { signOut } from "@/lib/actions"
import { ProjectsTable } from "@/components/admin/projects-table"

export default async function AdminDashboard() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center luxury-gradient">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch projects
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
  }

  const projectsData = projects || []
  const featuredCount = projectsData.filter((p) => p.featured).length

  return (
    <div className="min-h-screen luxury-gradient">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.email}</p>
          </div>
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              className="border-silver/30 text-silver hover:bg-silver/10 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/50 border-silver/20 silver-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-silver" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{projectsData.length}</div>
              <p className="text-xs text-muted-foreground">{featuredCount} featured projects</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-silver/20 silver-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Admin User</CardTitle>
              <User className="h-4 w-4 text-silver" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Active</div>
              <p className="text-xs text-muted-foreground">Logged in as admin</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-silver/20 silver-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
              <Settings className="h-4 w-4 text-silver" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Online</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Management */}
        <ProjectsTable projects={projectsData} />
      </div>
    </div>
  )
}
