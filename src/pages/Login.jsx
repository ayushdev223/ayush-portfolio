import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaLock, FaVenusMars } from 'react-icons/fa'

export default function Login({onBack}){
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [gender, setGender] = useState('male')
  const [msg, setMsg] = useState('')
  const submit = (e)=>{
    e.preventDefault()
    if(gender === 'male') setMsg('Welcome back sir! 🎉')
    else if(gender === 'female') setMsg('Welcome back madam! 🎉')
    else setMsg('Welcome back! 🎉')
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#07101a] via-[#0b1220] to-[#1a1a2e] relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
        animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl"
        animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-md w-full relative z-10">
        <motion.button
          onClick={onBack}
          className="mb-4 text-sm text-white/70 underline hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
        <motion.div
          initial={{opacity:0, y:20, scale: 0.9}}
          animate={{opacity:1, y:0, scale: 1}}
          transition={{duration:0.6, ease: "easeOut"}}
          className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6 relative z-10"
          >
            <motion.h3
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Welcome Back
            </motion.h3>
            <p className="text-sm text-white/70">Sign in to your account</p>
          </motion.div>

          <form onSubmit={submit} className="space-y-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                autoFocus
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 transition-colors"
                placeholder="Email"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="password"
                value={pw}
                onChange={e=>setPw(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none border border-white/20 focus:border-purple-400 transition-colors"
                placeholder="Password"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <select
                value={gender}
                onChange={e=>setGender(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white outline-none border border-white/20 focus:border-purple-400 transition-colors appearance-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 mt-6"
            >
              <motion.button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                type="button"
                onClick={()=>{ setEmail('demo@example.com'); setPw('demo'); setGender('male'); }}
                className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demo
              </motion.button>
            </motion.div>
          </form>

          {msg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center text-white font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              {msg}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
