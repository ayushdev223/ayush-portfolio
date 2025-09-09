import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import heroBg from '../assets/hero-bg.png'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Hero({onViewProject}){
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsBlurred(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <img src={heroBg} alt="" className={`hero-bg ${isBlurred ? 'blur-sm' : ''}`} loading="lazy" />
      <div className="hero-overlay" aria-hidden />
      <div className="container relative z-10 text-center py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-white/90">
            <div className="hero-title h1-large">Ayush</div>
            <div className="mt-2 text-sm text-white/70">Hi I'm Ayush — 12 yro, 8th grader.</div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mt-6 hero-title h1 text-white"
            whileHover={{ scale: 1.02 }}
          >
            I build polished, production‑grade web apps — fast
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 hero-sub text-base md:text-lg"
          >
            Frontend & full-stack enthusiast focused on performance, delightful micro-interactions, and accessible experiences. I build fast, reliable interfaces with scalable code.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <motion.a
              href="/Ayush_Resume.pdf"
              download
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download resume
            </motion.a>
            <motion.button
              onClick={onViewProject}
              className="btn btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View flagship project
            </motion.button>
            <motion.a
              href="https://github.com/ayushdev223"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                boxShadow: '0 0 20px rgba(124,58,237,0.8)'
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  '0 0 0 rgba(124,58,237,0)',
                  '0 0 15px rgba(124,58,237,0.5)',
                  '0 0 0 rgba(124,58,237,0)'
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 0.6,
                  ease: "easeInOut"
                }
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="shape"
        style={{width:260,height:260,left:'6%',top:'10%',background:'#7c3aed'}}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="shape"
        style={{width:380,height:380,right:'6%',bottom:'0%',background:'#6d28d9'}}
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="shape"
        style={{width:150,height:150,left:'20%',top:'20%',background:'#a855f7'}}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="shape"
        style={{width:200,height:200,right:'20%',top:'30%',background:'#7c3aed'}}
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
    </section>
  )
}
