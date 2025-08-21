"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium silver-glow"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <Shield className="mr-2 h-4 w-4" />
          Sign In to Admin
        </>
      )}
    </Button>
  )
}

export function AdminLoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
    }
  }, [state, router])

  return (
    <div className="min-h-screen flex items-center justify-center luxury-gradient px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="bg-card/50 border-silver/20 silver-glow">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-silver/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-silver" />
            </div>
            <CardTitle className="text-2xl font-serif font-bold text-gradient">Admin Access</CardTitle>
            <p className="text-muted-foreground">Sign in to manage your portfolio content</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form action={formAction} className="space-y-6">
              {state?.error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {state.error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-silver">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-silver">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-background/50 border-silver/30 focus:border-silver text-foreground"
                  />
                </div>
              </div>

              <SubmitButton />
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <p>Secure admin access for portfolio management</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
