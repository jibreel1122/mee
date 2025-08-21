import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Jibreel Bornat - Full Stack Developer",
  description: "Palestinian Computer Engineer & Full Stack Developer specializing in modern web technologies",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-serif: ${playfair.variable};
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="floating-code">
              <div className="code-word" style={{ left: "10%", animationDelay: "0s", animationDuration: "20s" }}>
                function()
              </div>
              <div className="code-word" style={{ left: "25%", animationDelay: "3s", animationDuration: "18s" }}>
                const
              </div>
              <div className="code-word" style={{ left: "40%", animationDelay: "6s", animationDuration: "22s" }}>
                React
              </div>
              <div className="code-word" style={{ left: "60%", animationDelay: "9s", animationDuration: "19s" }}>
                async
              </div>
              <div className="code-word" style={{ left: "75%", animationDelay: "12s", animationDuration: "21s" }}>
                await
              </div>
              <div className="code-word" style={{ left: "90%", animationDelay: "15s", animationDuration: "17s" }}>
                return
              </div>
              <div className="code-word" style={{ left: "15%", animationDelay: "18s", animationDuration: "23s" }}>
                TypeScript
              </div>
              <div className="code-word" style={{ left: "85%", animationDelay: "21s", animationDuration: "16s" }}>
                Next.js
              </div>
            </div>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
