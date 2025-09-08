import React, {useState, useEffect, useRef} from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Login from './pages/Login'
import WeatherApp from './components/WeatherApp'
import './styles.css'
import projects from '../content/projects.json'
import { AnimatePresence, motion } from 'framer-motion'
import { FaReact, FaJsSquare, FaStar, FaUsers, FaHome, FaUser, FaEnvelope, FaCog, FaCode, FaDownload } from 'react-icons/fa'
import { SiTailwindcss, SiFramer } from 'react-icons/si'
import heroBg from './assets/hero-bg.png'

export default function App(){
  const [view, setView] = useState('home') // home | projects | about | login
  const [theme, setTheme] = useState('dark')
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)

  // Refs for sections to scroll to
  const homeRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Scroll listener for back-to-top and progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = totalScroll / windowHeight
      setScrollProgress(scroll)
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.querySelector('.cursor')
    const cursorFollow = document.querySelector('.cursor-follow')

    if (cursor && cursorFollow) {
      const moveCursor = (e) => {
        cursor.style.left = e.clientX - 10 + 'px'
        cursor.style.top = e.clientY - 10 + 'px'
        cursorFollow.style.left = e.clientX - 20 + 'px'
        cursorFollow.style.top = e.clientY - 20 + 'px'
      }

      const handleMouseEnter = () => {
        cursor.style.transform = 'scale(1.5)'
        cursorFollow.style.transform = 'scale(1.5)'
      }

      const handleMouseLeave = () => {
        cursor.style.transform = 'scale(1)'
        cursorFollow.style.transform = 'scale(1)'
      }

      document.addEventListener('mousemove', moveCursor)
      document.querySelectorAll('button, a, .btn').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })

      return () => {
        document.removeEventListener('mousemove', moveCursor)
        document.querySelectorAll('button, a, .btn').forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }
  }, [])

  // Scroll to section based on nav click
  const handleNav = (section) => {
    if(section === 'login'){
      setView('login')
    } else {
      setView('home')
      if(section === 'home' && homeRef.current){
        homeRef.current.scrollIntoView({behavior: 'smooth'})
      } else if(section === 'projects' && projectsRef.current){
        projectsRef.current.scrollIntoView({behavior: 'smooth'})
      } else if(section === 'about' && aboutRef.current){
        aboutRef.current.scrollIntoView({behavior: 'smooth'})
      } else if(section === 'contact' && contactRef.current){
        contactRef.current.scrollIntoView({behavior: 'smooth'})
      }
    }
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const openModal = (project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <Header onNav={handleNav} theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait" initial={false}>
        {view === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Login onBack={()=> setView('home')} />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div ref={homeRef}>
              <Hero onViewProject={()=> setView('login')} />
            </div>
            <motion.section
              ref={projectsRef}
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Projects
              </motion.h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {projects.map((p, index)=> {
                  const techIcons = {
                    'React': <FaReact size={16} />,
                    'JavaScript': <FaJsSquare size={16} />,
                    'Tailwind': <SiTailwindcss size={16} />,
                    'Framer Motion': <SiFramer size={16} />
                  }
                  return (
                    <motion.article
                      key={p.slug}
                      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 cursor-pointer"
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-40 rounded-md mb-4 flex items-center justify-center text-white/60 overflow-hidden" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="bg-black/50 w-full h-full flex items-center justify-center">
                          <span className="text-white font-semibold">{p.title}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg text-white">{p.title}</h3>
                      <p className="text-sm text-white/80 mt-2">{p.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.map((tech, i) => (
                          <span key={i} className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs text-white/90">
                            {techIcons[tech] || tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-4 text-sm text-white/70">
                        <span className="flex items-center gap-1"><FaStar /> {p.metrics.stars}</span>
                        <span className="flex items-center gap-1"><FaUsers /> {p.metrics.users}</span>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <motion.button
                          onClick={()=> openModal(p)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View
                        </motion.button>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.section>
            <motion.section
              ref={aboutRef}
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                About
              </motion.h2>
              <div className="max-w-2xl mx-auto text-center text-white/80">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Hi I'm Ayush, a 12-year-old 8th grader learning to build delightful web experiences. I focus on clean interfaces, animations, and responsive, accessible design.
                </motion.p>
                <motion.div
                  className="mt-6 grid skills-grid"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    { name: 'React', icon: <FaReact size={24} /> },
                    { name: 'JavaScript', icon: <FaJsSquare size={24} /> },
                    { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} /> },
                    { name: 'Framer Motion', icon: <SiFramer size={24} /> },
                  ].map(({ name, icon }, index) => (
                    <motion.div
                      key={name}
                      className="bg-white/4 p-4 rounded-lg flex items-center gap-2 justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {icon}
                      <span>{name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              ref={contactRef}
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Contact Me
              </motion.h2>
              <div className="max-w-2xl mx-auto">
                <form className="space-y-4" action="https://formsubmit.co/ayushdev677@gmail.com" method="POST">
                  <input type="text" name="name" placeholder="Your Name" className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20" required />
                  <input type="email" name="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20" required />
                  <textarea name="message" placeholder="Your Message" rows="5" className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20" required></textarea>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </motion.section>



            {/* Counters */}
            <motion.section
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center justify-items-center">
                {[
                  { label: "Projects Completed", value: 12 },
                  // Removed Happy Clients as per user request
                  { label: "Lines of Code", value: 10000 },
                  { label: "Years Experience", value: 2 }
                ].map((c, i) => (
                  <motion.div
                    key={c.label}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {c.value}+
                    </motion.div>
                    <div className="text-white/70">{c.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Services */}
            <motion.section
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Services
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: <FaReact size={32} />, title: "Frontend Development", desc: "Building responsive, interactive web applications with modern frameworks." },
                  { icon: <SiTailwindcss size={32} />, title: "UI/UX Design", desc: "Creating beautiful, user-friendly interfaces with attention to detail." },
                  { icon: <SiFramer size={32} />, title: "Animation & Motion", desc: "Adding smooth animations and micro-interactions for enhanced user experience." }
                ].map((service, i) => (
                  <motion.div
                    key={service.title}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  >
                    <div className="text-purple-400 mb-4 flex justify-center">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-white/70">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Skills Progress */}
            <motion.section
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Skills
              </motion.h2>
              <div className="max-w-2xl mx-auto space-y-4">
                {[
                  { name: "React", level: 90 },
                  { name: "JavaScript", level: 85 },
                  { name: "Tailwind CSS", level: 95 },
                  { name: "Framer Motion", level: 80 }
                ].map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{s.name}</span>
                      <span className="text-white/70">{s.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Newsletter */}
            <motion.section
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="max-w-2xl mx-auto text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-2xl font-bold mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Stay Updated
                </motion.h2>
                <motion.p
                  className="text-white/70 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Get notified about new projects and updates
                </motion.p>
                <motion.form
                  className="flex gap-3 max-w-md mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              className="container mt-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                FAQ
              </motion.h2>
              <div className="max-w-2xl mx-auto space-y-4">
                {[
                  { q: "What technologies do you specialize in?", a: "I specialize in React, JavaScript, Tailwind CSS, and Framer Motion for creating modern web applications." },
                  { q: "Do you work on freelance projects?", a: "Yes, I'm available for freelance work and collaboration on exciting projects." },
                  { q: "What's your development process?", a: "I follow a design-first approach, focusing on user experience, performance, and clean code." }
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                    <p className="text-white/70">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      {showModal && selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              <button onClick={closeModal} className="text-white/70 hover:text-white text-2xl">✕</button>
            </div>

            {selectedProject.slug === 'weather-web-app' ? (
              <div>
                {/* Project Overview */}
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-white/80 mb-4">{selectedProject.body}</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {selectedProject.tech.map((tech, i) => (
                        <span key={i} className="bg-white/10 px-3 py-1 rounded text-sm text-white/90">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Weather App */}
                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-xl font-bold text-white text-center mb-4">Live Weather App</h3>
                  <div className="bg-white/5 rounded-xl overflow-hidden" style={{ height: '600px' }}>
                    <WeatherApp />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <img src={heroBg} alt={selectedProject.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-white/80 mb-4">{selectedProject.body}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="bg-white/10 px-3 py-1 rounded text-sm text-white/90">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <a href={selectedProject.links.live} className="btn btn-primary">Live Demo</a>
                  <a href={selectedProject.links.repo} className="btn btn-ghost">Repository</a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Scroll Progress */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Custom Cursor */}
      <div className="cursor"></div>
      <div className="cursor-follow"></div>

      {/* Floating Menu */}
      <div className="floating-menu">
        <motion.button
          className="menu-toggle"
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCog />
        </motion.button>
        <div className={`menu-items ${showFloatingMenu ? 'show' : ''}`}>
          <motion.button
            className="menu-item"
            onClick={() => handleNav('home')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHome />
          </motion.button>
          <motion.button
            className="menu-item"
            onClick={() => handleNav('projects')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaReact />
          </motion.button>
          <motion.button
            className="menu-item"
            onClick={() => handleNav('about')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaUser />
          </motion.button>
          <motion.button
            className="menu-item"
            onClick={() => handleNav('contact')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope />
          </motion.button>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.button>
    </div>
  )
}
