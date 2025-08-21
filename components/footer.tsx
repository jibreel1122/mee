"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUp, Heart, Code } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-silver/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-20 h-20 border border-silver/10 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-silver/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-serif font-bold text-gradient">Jibreel Bornat</h3>
            <p className="text-muted-foreground">
              Palestinian Computer Engineer crafting exceptional digital experiences
            </p>
          </motion.div>

          {/* Center - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h4 className="text-lg font-semibold text-silver">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-silver transition-colors duration-300"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Back to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <Button
              onClick={scrollToTop}
              variant="outline"
              className="border-silver/30 text-silver hover:bg-silver/10 bg-transparent"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-silver/20 mt-8 pt-8 text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>and</span>
            <Code className="w-4 h-4 text-silver" />
            <span>in Palestine</span>
          </div>
          <p className="text-sm text-muted-foreground">© {currentYear} Jibreel Bornat. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
