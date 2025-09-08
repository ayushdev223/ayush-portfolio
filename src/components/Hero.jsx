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
