"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Languages, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && theme) {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [theme, mounted])

  useEffect(() => {
    if (mounted) {
      const handleLanguageChange = () => {
        // Force re-render when language changes
        setMounted(false)
        setTimeout(() => setMounted(true), 50)
      }

      window.addEventListener("languagechange", handleLanguageChange)
      return () => window.removeEventListener("languagechange", handleLanguageChange)
    }
  }, [mounted])

  const navItems = [
    { key: "about", href: "#about" },
    { key: "skills", href: "#skills" },
    { key: "projects", href: "#projects" },
    { key: "contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Force immediate DOM update
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "ar" : "en"
    setLanguage(newLanguage)
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-silver/20 theme-transition">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-serif font-bold text-gradient"
          >
            Jibreel Bornat
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-silver transition-colors duration-300"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleThemeToggle}
              className="border-silver/30 text-silver hover:bg-silver/10 bg-transparent theme-transition"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLanguageToggle}
              className="border-silver/30 text-silver hover:bg-silver/10 bg-transparent theme-transition"
              aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
            >
              <Languages className="h-4 w-4 mr-1" />
              {language === "en" ? "عربي" : "EN"}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden border-silver/30 text-silver hover:bg-silver/10 bg-transparent theme-transition"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-silver/20 py-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-muted-foreground hover:text-silver transition-colors duration-300 py-2"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
