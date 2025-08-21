"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.home": "Home",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "nav.logout": "Logout",

    // Theme Toggle
    "theme.light": "Light Mode",
    "theme.dark": "Dark Mode",
    "theme.toggle": "Toggle Theme",

    // Language Toggle
    "language.english": "English",
    "language.arabic": "العربية",
    "language.toggle": "Switch Language",

    // Hero Section
    "hero.greeting": "Hello, I'm",
    "hero.name": "Jibreel Bornat",
    "hero.title": "Computer Engineering Student at Birzeit University",
    "hero.description":
      "Passionate about creating innovative digital solutions and learning cutting-edge technologies to build exceptional web experiences.",
    "hero.cta.contact": "Get In Touch",
    "hero.cta.work": "View My Work",

    // About Section
    "about.title": "About Me",
    "about.subtitle": "Passionate about creating digital solutions that make a difference",
    "about.role": "Computer Engineering Student",
    "about.description1":
      "Born and raised in Ramallah - Billin, Palestine, I bring a unique perspective to the world of technology. Currently studying Computer Engineering at Birzeit University, my journey is driven by a passion for innovation and a desire to create meaningful digital experiences.",
    "about.description2":
      "I specialize in building modern web applications using cutting-edge technologies. I believe in writing clean, maintainable code and creating user interfaces that are both beautiful and functional.",
    "about.description3":
      "When I'm not coding or studying, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
    "about.skills.title": "Core Technologies",

    // Skills Section
    "skills.title": "Programming Languages",
    "skills.subtitle": "Core technologies I work with",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "A showcase of my latest work and technical achievements",
    "projects.filter.all": "All Projects",
    "projects.filter.featured": "Featured",
    "projects.button.demo": "Live Demo",
    "projects.button.code": "Code",
    "projects.badge.featured": "Featured",
    "projects.loading": "Loading projects...",
    "projects.empty": "No projects found for the selected filter.",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to bring your ideas to life? Let's discuss your next project",
    "contact.connect": "Let's Connect",
    "contact.whatsapp.title": "Quick Chat",
    "contact.whatsapp.description": "Get instant responses",
    "contact.whatsapp.button": "WhatsApp",
    "contact.follow": "Follow Me",
    "contact.form.title": "Send a Message",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success": "Message sent successfully!",
    "contact.form.error": "Failed to send message. Please try again.",

    // Footer
    "footer.description": "Palestinian Computer Engineer crafting exceptional digital experiences",
    "footer.links": "Quick Links",
    "footer.back": "Back to Top",
    "footer.made": "Made with",
    "footer.and": "and",
    "footer.in": "in Palestine",
    "footer.rights": "All rights reserved.",

    // Admin Panel
    "admin.title": "Admin Dashboard",
    "admin.login.title": "Admin Login",
    "admin.login.email": "Email",
    "admin.login.password": "Password",
    "admin.login.submit": "Sign In",
    "admin.login.back": "Back to Portfolio",
    "admin.logout": "Logout",
    "admin.projects.title": "Manage Projects",
    "admin.projects.add": "Add New Project",
    "admin.projects.edit": "Edit Project",
    "admin.projects.delete": "Delete",
    "admin.projects.save": "Save Project",
    "admin.projects.cancel": "Cancel",
    "admin.form.title": "Project Title",
    "admin.form.description": "Short Description",
    "admin.form.longDescription": "Long Description",
    "admin.form.technologies": "Technologies (comma separated)",
    "admin.form.imageUrl": "Image URL",
    "admin.form.imageUpload": "Upload Image",
    "admin.form.demoUrl": "Demo URL",
    "admin.form.githubUrl": "GitHub URL",
    "admin.form.featured": "Featured Project",
    "admin.stats.total": "Total Projects",
    "admin.stats.featured": "Featured Projects",
    "admin.stats.published": "Published Projects",
  },
  ar: {
    // Navigation
    "nav.about": "نبذة عني",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.contact": "تواصل معي",
    "nav.home": "الرئيسية",
    "nav.admin": "لوحة التحكم",
    "nav.login": "تسجيل الدخول",
    "nav.logout": "تسجيل الخروج",

    // Theme Toggle
    "theme.light": "الوضع المضيء",
    "theme.dark": "الوضع المظلم",
    "theme.toggle": "تبديل المظهر",

    // Language Toggle
    "language.english": "English",
    "language.arabic": "العربية",
    "language.toggle": "تغيير اللغة",

    // Hero Section
    "hero.greeting": "مرحباً، أنا",
    "hero.name": "جبريل برناط",
    "hero.title": "طالب هندسة حاسوب في جامعة بيرزيت",
    "hero.description": "شغوف بإنشاء حلول رقمية مبتكرة وتعلم أحدث التقنيات لبناء تجارب ويب استثنائية.",
    "hero.cta.contact": "تواصل معي",
    "hero.cta.work": "شاهد أعمالي",

    // About Section
    "about.title": "نبذة عني",
    "about.subtitle": "شغوف بإنشاء حلول رقمية تحدث فرقاً",
    "about.role": "طالب هندسة حاسوب",
    "about.description1":
      "وُلدت وترعرعت في رام الله - بلعين، فلسطين، وأحمل منظوراً فريداً لعالم التكنولوجيا. أدرس حالياً هندسة الحاسوب في جامعة بيرزيت، ورحلتي مدفوعة بشغف الابتكار والرغبة في إنشاء تجارب رقمية ذات معنى.",
    "about.description2":
      "أتخصص في بناء تطبيقات الويب الحديثة باستخدام أحدث التقنيات. أؤمن بكتابة كود نظيف وقابل للصيانة وإنشاء واجهات مستخدم جميلة ووظيفية.",
    "about.description3":
      "عندما لا أكون أبرمج أو أدرس، ستجدني أستكشف تقنيات جديدة، أساهم في مشاريع مفتوحة المصدر، أو أشارك المعرفة مع مجتمع المطورين.",
    "about.skills.title": "التقنيات الأساسية",

    // Skills Section
    "skills.title": "لغات البرمجة",
    "skills.subtitle": "التقنيات الأساسية التي أعمل بها",

    // Projects Section
    "projects.title": "المشاريع المميزة",
    "projects.subtitle": "عرض لأحدث أعمالي وإنجازاتي التقنية",
    "projects.filter.all": "جميع المشاريع",
    "projects.filter.featured": "المميزة",
    "projects.button.demo": "عرض مباشر",
    "projects.button.code": "الكود",
    "projects.badge.featured": "مميز",
    "projects.loading": "جاري تحميل المشاريع...",
    "projects.empty": "لم يتم العثور على مشاريع للفلتر المحدد.",

    // Contact Section
    "contact.title": "تواصل معي",
    "contact.subtitle": "مستعد لتحويل أفكارك إلى واقع؟ دعنا نناقش مشروعك القادم",
    "contact.connect": "لنتواصل",
    "contact.whatsapp.title": "محادثة سريعة",
    "contact.whatsapp.description": "احصل على ردود فورية",
    "contact.whatsapp.button": "واتساب",
    "contact.follow": "تابعني",
    "contact.form.title": "أرسل رسالة",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.subject": "الموضوع",
    "contact.form.message": "الرسالة",
    "contact.form.send": "إرسال الرسالة",
    "contact.form.sending": "جاري الإرسال...",
    "contact.form.success": "تم إرسال الرسالة بنجاح!",
    "contact.form.error": "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.",

    // Footer
    "footer.description": "مهندس حاسوب فلسطيني يصنع تجارب رقمية استثنائية",
    "footer.links": "روابط سريعة",
    "footer.back": "العودة للأعلى",
    "footer.made": "صُنع بـ",
    "footer.and": "و",
    "footer.in": "في فلسطين",
    "footer.rights": "جميع الحقوق محفوظة.",

    // Admin Panel
    "admin.title": "لوحة التحكم",
    "admin.login.title": "تسجيل دخول المدير",
    "admin.login.email": "البريد الإلكتروني",
    "admin.login.password": "كلمة المرور",
    "admin.login.submit": "تسجيل الدخول",
    "admin.login.back": "العودة للملف الشخصي",
    "admin.logout": "تسجيل الخروج",
    "admin.projects.title": "إدارة المشاريع",
    "admin.projects.add": "إضافة مشروع جديد",
    "admin.projects.edit": "تعديل المشروع",
    "admin.projects.delete": "حذف",
    "admin.projects.save": "حفظ المشروع",
    "admin.projects.cancel": "إلغاء",
    "admin.form.title": "عنوان المشروع",
    "admin.form.description": "وصف مختصر",
    "admin.form.longDescription": "وصف مفصل",
    "admin.form.technologies": "التقنيات (مفصولة بفواصل)",
    "admin.form.imageUrl": "رابط الصورة",
    "admin.form.imageUpload": "رفع صورة",
    "admin.form.demoUrl": "رابط العرض",
    "admin.form.githubUrl": "رابط GitHub",
    "admin.form.featured": "مشروع مميز",
    "admin.stats.total": "إجمالي المشاريع",
    "admin.stats.featured": "المشاريع المميزة",
    "admin.stats.published": "المشاريع المنشورة",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
    window.dispatchEvent(new Event("languagechange"))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
