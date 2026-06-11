import { useState, useEffect } from "react"
import BackgroundParticles from "./components/BackgroundParticles"
import TypingEffect from "./components/TypingEffect"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  Send,
  Terminal,
  Brain,
  Code2,
  Database,
  Search,
  Award,
  Briefcase,
  ChevronUp,
  Mail,
  FileText,
  CheckCircle2
} from "lucide-react"

// --- Local GitHub SVG Icon Component ---
const Github = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [projectFilter, setProjectFilter] = useState("all")
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Form states
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  // Handle themes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  // Scroll tracking for navigation states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }

      const sections = ["home", "about", "skills", "projects", "intern-cert", "contact"]
      const scrollPos = window.scrollY + 160

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Form validation
  const validateForm = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = "Please enter your name"
    if (!form.email.trim()) {
      errors.email = "Please enter your email"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!form.message.trim()) errors.message = "Please enter your message"
    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedData({
        ...form,
        time: new Date().toLocaleTimeString(),
      })
      setForm({ name: "", email: "", subject: "", message: "" })
    }, 1500)
  }

  // Skills Categories
  const skillSets = [
    {
      category: "Machine Learning & AI",
      icon: <Brain className="w-5 h-5 text-blue-500 dark:text-violet-400" />,
      skills: [
        { name: "Python Programming", level: 92 },
        { name: "TensorFlow & Keras", level: 85 },
        { name: "Scikit-Learn", level: 88 },
        { name: "PyTorch & Deep Learning (CNNs)", level: 80 }
      ]
    },
    {
      category: "Data Analysis & Databases",
      icon: <Database className="w-5 h-5 text-blue-500 dark:text-violet-400" />,
      skills: [
        { name: "SQL & Relational Databases", level: 87 },
        { name: "Pandas & NumPy", level: 90 },
        { name: "Matplotlib & Seaborn", level: 88 },
        { name: "Tableau & Power BI", level: 78 }
      ]
    },
    {
      category: "Web Development & Tools",
      icon: <Code2 className="w-5 h-5 text-blue-500 dark:text-violet-400" />,
      skills: [
        { name: "React.js & Tailwind CSS", level: 85 },
        { name: "Node.js & Express REST APIs", level: 82 },
        { name: "MongoDB & PostgreSQL", level: 80 },
        { name: "Git, GitHub & Docker", level: 85 }
      ]
    }
  ]

  // Projects list
  const projects = [
    {
      title: "Instagram Data Analysis",
      desc: "An extensive data analytics project utilizing Python, Pandas, and Seaborn to analyze post reach, impressions, follower engagement patterns, and optimal content posting strategies.",
      category: "data",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
      github: "https://github.com/gangammayn/instagram-data-analysis",
      live: "#",
      glowColor: "rgba(236, 72, 153, 0.15)"
    },
    {
      title: "Flower Image Classification",
      desc: "Deep Learning classifier built with TensorFlow and Convolutional Neural Networks (CNNs) to recognize and classify various species of flowers. Achieved 94% validation accuracy with model tuning.",
      category: "ml",
      tech: ["TensorFlow", "Keras", "CNN", "OpenCV", "Python"],
      github: "https://github.com/gangammayn/flower-image-classification",
      live: "#",
      glowColor: "rgba(59, 130, 246, 0.15)"
    },
    {
      title: "REST API Project",
      desc: "A production-grade backend server featuring clean MVC routing architecture, JWT session authentication, password cryptography encryption, MongoDB models, and exhaustive Postman verification tests.",
      category: "backend",
      tech: ["Node.js", "Express", "MongoDB", "JWT", "Postman"],
      github: "https://github.com/gangammayn/rest-api-project",
      live: "#",
      glowColor: "rgba(16, 185, 129, 0.15)"
    },
    {
      title: "Netflix UI Clone",
      desc: "Pixel-perfect modern frontend recreation of Netflix dashboard displaying movie catalogs fetched from TMDb API. Employs modern responsive layouts and hover-play animations.",
      category: "frontend",
      tech: ["React", "Tailwind CSS", "TMDb API", "Framer Motion"],
      github: "https://github.com/gangammayn/netflix-ui-clone",
      live: "#",
      glowColor: "rgba(239, 68, 68, 0.15)"
    },
    {
      title: "Portfolio Website",
      desc: "A futuristic dark-themed responsive portfolio built with Tailwind CSS and Framer Motion. Features premium glassmorphic UI elements, canvas interactive particles, and a customized theme toggler.",
      category: "frontend",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Canvas API"],
      github: "https://github.com/gangammayn/portfolio-website",
      live: "#",
      glowColor: "rgba(139, 92, 246, 0.15)"
    }
  ]

  const filteredProjects = projects.filter((project) => {
    if (projectFilter === "all") return true
    if (projectFilter === "data") return project.category === "data"
    if (projectFilter === "ml") return project.category === "ml"
    if (projectFilter === "backend") return project.category === "backend"
    if (projectFilter === "frontend") return project.category === "frontend"
    return true
  })

  // Experiences & Internships
  const internships = [
    {
      role: "Data Science & Analytics Intern",
      company: "TechSoft Solutions",
      period: "Oct 2025 - Dec 2025",
      desc: "Developed automated machine learning workflows, built visualization dashboards in Tableau, and cleaned large datasets resulting in 15% better insight accuracy."
    },
    {
      role: "Frontend Web Development Intern",
      company: "Veloce Technologies",
      period: "May 2025 - July 2025",
      desc: "Collaborated on production React dashboards, optimized stylesheet structures with Tailwind CSS, and completed mock Figma page implementations."
    }
  ]

  const certifications = [
    {
      name: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      date: "Dec 2025",
      details: "Neural Networks, Hyperparameter Tuning, CNNs, and Sequence Models."
    },
    {
      name: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "Aug 2025",
      details: "Exploratory analysis, statistical predictions, NumPy, and Pandas manipulation."
    },
    {
      name: "Full-Stack Web Development Course",
      issuer: "Udemy Academy",
      date: "June 2025",
      details: "JavaScript, React framework, RESTful backend design, and MongoDB schemas."
    },
    {
      name: "TensorFlow Developer Certificate",
      issuer: "Google / TensorFlow Core",
      date: "April 2025",
      details: "Image classification pipelines, NLP text tokenization, and time-series forecasts."
    }
  ]

  return (
    <div className="min-h-screen relative font-sans transition-colors duration-300">
      {/* Background Layer */}
      <div className="fixed inset-0 w-full h-full bg-slate-50 dark:bg-gray-950 -z-20 transition-colors duration-300" />
      
      {/* Ambient Pulsing Glow Blobs (Futuristic aesthetic) */}
      <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 glow-blob animate-pulse-slow" />
      <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-violet-400/10 dark:bg-purple-600/10 glow-blob animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[20%] left-[15%] w-80 h-80 bg-pink-400/5 dark:bg-pink-600/5 glow-blob animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Particle Canvas */}
      <BackgroundParticles />

      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white cursor-pointer" onClick={() => scrollTo("home")}>
              Gangamma<span className="text-blue-500 dark:text-violet-500">.YN</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {["home", "about", "skills", "projects", "intern-cert", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`text-sm font-medium capitalize transition-colors duration-200 relative py-1 ${
                  activeSection === section
                    ? "text-blue-600 dark:text-violet-400"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {section === "intern-cert" ? "Experience" : section}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-violet-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all duration-200"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 bg-slate-50/95 dark:bg-gray-950/95 backdrop-blur-md"
            >
              {["home", "about", "skills", "projects", "intern-cert", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium capitalize ${
                    activeSection === section
                      ? "bg-slate-100 dark:bg-slate-900/60 text-blue-600 dark:text-violet-400"
                      : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-900/30 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {section === "intern-cert" ? "Experience & Certifications" : section}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* --- HERO SECTION --- */}
        <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center pt-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Intro text */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-blue-100/50 dark:bg-violet-950/30 border border-blue-200 dark:border-violet-900/50 px-3 py-1.5 rounded-full w-fit"
              >
                <Terminal className="w-4 h-4 text-blue-600 dark:text-violet-400" />
                <span className="text-xs font-semibold text-blue-700 dark:text-violet-300 uppercase tracking-wider">
                  Systems Ready
                </span>
              </motion.div>

              <div className="space-y-3">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base sm:text-lg font-mono font-medium text-slate-500 dark:text-gray-400"
                >
                  Hello, I am
                </motion.h2>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                  Gangamma <span className="gradient-text dark:gradient-text-cyber">Y N</span>
                </motion.h1>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300"
                >
                  I specialize in{" "}
                  <span className="text-blue-600 dark:text-violet-400">
                    <TypingEffect words={["Machine Learning & AI", "Data Analytics", "Full-Stack Development"]} />
                  </span>
                </motion.h3>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed"
              >
                I am a passionate technology builder who bridges scientific data analysis and machine intelligence with modern web application engineering. Dedicated to translating complex models into intuitive user tools.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <button
                  onClick={() => scrollTo("projects")}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 dark:bg-violet-600 hover:bg-blue-700 dark:hover:bg-violet-700 shadow-lg shadow-blue-500/20 dark:shadow-violet-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 dark:border-gray-800 text-sm font-semibold rounded-lg text-slate-800 dark:text-white bg-slate-100/80 dark:bg-slate-900/40 hover:bg-slate-200/80 dark:hover:bg-slate-900/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Contact Me
                </button>
              </motion.div>
            </div>

            {/* Visual Abstract Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-violet-500/20 to-pink-500/20 blur-xl animate-pulse-slow" />
                
                {/* Dashboard Frame */}
                <div className="w-full h-full glass-panel border rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden shadow-2xl animate-float">
                  {/* Top dots */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      portfolio_kernel.sh
                    </span>
                  </div>

                  {/* Terminal Core Graphic */}
                  <div className="flex-grow flex flex-col justify-center font-mono text-left space-y-4 py-6">
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 dark:text-cyan-400">$ whoami</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 pl-4">Gangamma Y N</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 dark:text-cyan-400">$ cat location.cfg</p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 pl-4">Karnataka, India</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 dark:text-cyan-400">$ node --version</p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 pl-4">v19.2.6 [STABLE]</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 dark:text-cyan-400">$ python -c "import ai"</p>
                      <p className="text-xs text-slate-400 pl-4"># Models initialized successfully</p>
                      <p className="text-xs text-slate-400 pl-4"># CNN layers verified [OK]</p>
                    </div>
                  </div>

                  {/* Bottom code status bar */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready</span>
                    </div>
                    <span>UTF-8</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-20 border-t border-slate-200/60 dark:border-gray-900/60">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-violet-400 uppercase">
              01 / Personal Blueprint
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              The Philosophy
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                Bridging machine algorithms with practical web platforms.
              </h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                I am a technical builder enthusiastic about identifying hidden stories in data matrices and configuring software pipelines that make deep models accessible. My training encompasses training neural classifiers, developing analytics models, and implementing frontend frameworks.
              </p>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                When structuring codebases, my focus centers on performance optimizations, reusable logic components, responsive design rules, and intuitive user navigation maps.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-violet-400 hover:text-blue-700 dark:hover:text-violet-300 transition-colors"
                >
                  <span>Initiate Discussion</span>
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick facts cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { label: "Data Projects", num: "10+" },
                { label: "ML Accuracy (Avg)", num: "90%+" },
                { label: "REST APIs Built", num: "5+" },
                { label: "Clean Code", num: "100%" }
              ].map((item, idx) => (
                <div key={idx} className="glass-card border rounded-2xl p-6 text-center">
                  <span className="block text-3xl font-extrabold text-blue-600 dark:text-violet-400 mb-1">
                    {item.num}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="py-20 border-t border-slate-200/60 dark:border-gray-900/60">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-violet-400 uppercase">
              02 / Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Tooling &amp; Frameworks
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillSets.map((set, setIdx) => (
              <div key={setIdx} className="glass-panel border rounded-2xl p-6 text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
                    {set.icon}
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{set.category}</h3>
                  </div>

                  <div className="space-y-5">
                    {set.skills.map((skill, skIdx) => (
                      <div key={skIdx} className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700 dark:text-gray-300">{skill.name}</span>
                          <span className="font-mono text-blue-600 dark:text-violet-400">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-20 border-t border-slate-200/60 dark:border-gray-900/60">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-violet-400 uppercase">
              03 / Selected Creations
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Featured Case Studies
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap items-center bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-1 rounded-xl">
              {[
                { id: "all", label: "All Works" },
                { id: "data", label: "Data Analysis" },
                { id: "ml", label: "Machine Learning" },
                { id: "backend", label: "REST APIs" },
                { id: "frontend", label: "Frontend" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setProjectFilter(filter.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    projectFilter === filter.id
                      ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-violet-400 shadow-sm"
                      : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.title}
                  className="glass-card border rounded-2xl overflow-hidden flex flex-col justify-between h-full relative"
                  style={{ "--glow-color": project.glowColor }}
                >
                  <div>
                    {/* Visual header box */}
                    <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200/50 dark:from-slate-900 dark:to-slate-950/20 border-b border-slate-800 flex items-center justify-center relative p-6">
                      <div className="absolute inset-0 bg-blue-500/5 dark:bg-violet-500/5 opacity-50" />
                      <div className="z-10 text-center space-y-2">
                        <span className="block text-xs font-mono font-bold tracking-widest text-blue-500 dark:text-violet-400 uppercase">
                          {project.category === "data" ? "Analytics Engine" : project.category === "ml" ? "Intelligence Model" : "App Interface"}
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="p-6 text-left space-y-4">
                      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed min-h-[5rem]">
                        {project.desc}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-violet-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project controls/links */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 border border-slate-200 dark:border-gray-800 text-xs font-bold rounded-lg text-slate-700 dark:text-gray-300 bg-slate-100/50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all duration-200 text-center"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 text-xs font-bold rounded-lg text-white bg-blue-600 dark:bg-violet-600 hover:bg-blue-700 dark:hover:bg-violet-700 transition-all duration-200 shadow shadow-blue-500/10 dark:shadow-violet-900/20 text-center"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* --- INTERNSHIP & CERTIFICATIONS SECTION --- */}
        <section id="intern-cert" className="py-20 border-t border-slate-200/60 dark:border-gray-900/60">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-violet-400 uppercase">
              04 / Career Steps
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Experience &amp; Credentials
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            {/* Internships Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-violet-400" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Professional Internships</h3>
              </div>

              <div className="relative pl-6 border-l-2 border-slate-200 dark:border-gray-800 space-y-8">
                {internships.map((intern, idx) => (
                  <div key={idx} className="relative space-y-2">
                    {/* timeline node */}
                    <div className="absolute -left-[31px] top-1.5 w-5 h-5 rounded-full border-2 border-blue-500 dark:border-violet-500 bg-slate-50 dark:bg-gray-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-violet-500 rounded-full" />
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                        {intern.role}
                      </h4>
                      <span className="text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full">
                        {intern.period}
                      </span>
                    </div>
                    <span className="block text-sm font-semibold text-blue-600 dark:text-violet-400">
                      {intern.company}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      {intern.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-5 h-5 text-blue-600 dark:text-violet-400" />
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Specialized Certifications</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="glass-panel border rounded-2xl p-5 hover:border-blue-500/30 dark:hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-snug">
                          {cert.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                        {cert.details}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="font-bold text-blue-600 dark:text-violet-400">{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-20 border-t border-slate-200/60 dark:border-gray-900/60">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-violet-400 uppercase">
              05 / Connect Nodes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Initiate Message Log
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info */}
            <div className="lg:col-span-5 text-left space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Let&apos;s build something intelligent.
              </h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Whether you have an interesting data analytics challenge, a backend application project, or simply want to connect, feel free to send a message.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 text-slate-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-violet-400" />
                  <span className="text-sm">gangammayn@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 dark:text-gray-400">
                  <Github className="w-5 h-5 text-blue-600 dark:text-violet-400" />
                  <span className="text-sm">github.com/gangammayn</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel border rounded-2xl p-6 sm:p-8">
                {submittedData ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-left"
                  >
                    <div className="flex items-center space-x-3 bg-emerald-100/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 px-4 py-3 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span>Data packet transmitted successfully! Node responded 200 OK.</span>
                    </div>

                    {/* Transmission Simulator */}
                    <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 font-mono text-xs text-slate-700 dark:text-gray-300 space-y-2.5">
                      <h4 className="font-bold text-blue-600 dark:text-violet-400 text-xs border-b border-slate-200 dark:border-slate-800 pb-2 mb-3 uppercase tracking-wider">
                        Response Terminal Dump
                      </h4>
                      <div>
                        <span className="text-slate-400">STATUS:</span> <span className="text-emerald-500 font-bold">200 SUCCESS</span>
                      </div>
                      <div>
                        <span className="text-slate-400">TIMESTAMP:</span> {submittedData.time}
                      </div>
                      <div>
                        <span className="text-slate-400">SENDER:</span> {submittedData.name} &lt;{submittedData.email}&gt;
                      </div>
                      {submittedData.subject && (
                        <div>
                          <span className="text-slate-400">SUBJECT:</span> {submittedData.subject}
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400">PAYLOAD:</span> &quot;{submittedData.message}&quot;
                      </div>
                    </div>

                    <button
                      onClick={() => setSubmittedData(null)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-gray-800 text-xs font-semibold rounded-lg text-slate-700 dark:text-gray-300 bg-slate-100/80 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-900/80 cursor-pointer transition-colors"
                    >
                      Send Another Log
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 border text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 dark:focus:border-violet-500/60 transition-colors text-sm ${
                            formErrors.name ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
                          }`}
                          placeholder="Your name"
                        />
                        {formErrors.name && (
                          <span className="text-xs text-rose-500 font-semibold">{formErrors.name}</span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 border text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 dark:focus:border-violet-500/60 transition-colors text-sm ${
                            formErrors.email ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
                          }`}
                          placeholder="yourname@domain.com"
                        />
                        {formErrors.email && (
                          <span className="text-xs text-rose-500 font-semibold">{formErrors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 dark:focus:border-violet-500/60 transition-colors text-sm"
                        placeholder="Collaboration / Consultation / Hiring"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-950 border text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 dark:focus:border-violet-500/60 transition-colors text-sm ${
                          formErrors.message ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
                        }`}
                        placeholder="Type details here..."
                        style={{ resize: "none" }}
                      />
                      {formErrors.message && (
                        <span className="text-xs text-rose-500 font-semibold">{formErrors.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 dark:bg-violet-600 hover:bg-blue-700 dark:hover:bg-violet-700 disabled:opacity-50 cursor-pointer shadow-lg shadow-blue-500/10 dark:shadow-violet-900/20 transition-all duration-200 text-center"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200/60 dark:border-gray-900/60 py-10 relative z-10 bg-slate-50/50 dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 dark:text-gray-400 text-sm">
          <span>&copy; {new Date().getFullYear()} Gangamma Y N. All rights reserved.</span>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/gangammayn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-violet-400 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:gangammayn@gmail.com"
              className="hover:text-blue-600 dark:hover:text-violet-400 transition-colors"
              title="Direct Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 dark:bg-violet-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
