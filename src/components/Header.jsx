import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import profileImg from '../assets/profile.png'

export default function Header({onNav, theme, toggleTheme}){
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      className="w-full py-4 bg-transparent fixed top-0 left-0 z-50 backdrop-blur-md glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.img
            src={profileImg}
            alt="Ayush"
            className="w-10 h-10 rounded-full border border-white/8 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <div>
            <div className="text-sm font-semibold text-white">Ayush</div>
            <div className="text-xs text-white/70">Age 12 • Front‑End Enthusiast</div>
          </div>
        </motion.div>
        <motion.nav
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={()=>onNav('home')}
            className="text-white/90 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button
            onClick={()=>onNav('projects')}
            className="text-white/90 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Projects
          </motion.button>
          <motion.button
            onClick={()=>onNav('about')}
            className="text-white/90 hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
          <motion.a
            href="/Ayush_Resume.pdf"
            download
            className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
          <button
            onClick={toggleTheme}
            className="ml-4 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </motion.nav>
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-3 py-2 rounded bg-white/6 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </motion.div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.nav
          className="md:hidden bg-black/90 backdrop-blur-md py-4 px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            <motion.button
              onClick={() => { onNav('home'); setIsMenuOpen(false); }}
              className="text-white/90 hover:underline text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => { onNav('projects'); setIsMenuOpen(false); }}
              className="text-white/90 hover:underline text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.button>
            <motion.button
              onClick={() => { onNav('about'); setIsMenuOpen(false); }}
              className="text-white/90 hover:underline text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.a
              href="/Ayush_Resume.pdf"
              download
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
            <button
              onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition text-left"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  )
}
