"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function SkillsSection() {
  const { language, t } = useLanguage()

  const programmingLanguages = [
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "from-yellow-400 to-yellow-600",
      level: 95,
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-green-400 to-blue-500",
      level: 88,
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "from-red-500 to-orange-500",
      level: 85,
    },
    {
      name: "C",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      color: "from-blue-600 to-purple-600",
      level: 80,
    },
    {
      name: "Flutter",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      color: "from-blue-400 to-cyan-500",
      level: 78,
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-cyan-400 to-blue-500",
      level: 93,
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-green-500 to-green-700",
      level: 87,
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "from-gray-700 to-gray-900",
      level: 91,
    },
  ]

  return (
    <section id="skills" className="py-20 luxury-gradient relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6">{t("skills.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("skills.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programmingLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="relative overflow-hidden backdrop-blur-md bg-slate-900/20 dark:bg-slate-900/20 light:bg-amber-50/60 border-2 border-slate-600/50 dark:border-slate-600/50 light:border-amber-400/70 hover:border-slate-400/70 dark:hover:border-slate-400/70 light:hover:border-amber-500/90 transition-all duration-500 h-full group shadow-xl hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent dark:from-white/5 light:from-amber-200/30 light:via-amber-100/20 light:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/20 dark:via-slate-400/20 light:via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>

                <CardContent className="relative p-8 text-center space-y-6 z-10">
                  <motion.div
                    className="relative mx-auto w-20 h-20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={lang.logo || "/placeholder.svg"}
                      alt={lang.name}
                      className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                    {lang.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-semibold text-accent">{lang.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${lang.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
