import React from 'react'
import { motion } from 'framer-motion'

export default function Footer(){
  return (
    <motion.footer
      className="mt-24 py-12 text-center text-white/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.p
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          © {new Date().getFullYear()} Ayush — Built with curiosity and code.
        </motion.p>
      </div>
    </motion.footer>
  )
}
