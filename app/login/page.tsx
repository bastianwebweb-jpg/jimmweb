"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase" // Ajustado a tu ruta estándar
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "@/store/theme" // 1. IMPORTAR THEME

export default function LoginPage() {
  const { frecuencia } = useTheme() // 2. CONSUMIR FRECUENCIA
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorVisible, setErrorVisible] = useState<string | null>(null)
  const router = useRouter()

  // 3. DEFINIR PIELES DE LOGIN
  const skins = {
    rap: {
      bg: "bg-black",
      card: "bg-[#0a0a0a] border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.1)]",
      accent: "text-red-600",
      btn: "bg-red-600 hover:bg-white hover:text-black shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)]",
      input: "focus:border-red-600",
      glow: "bg-red-600/10"
    },
    anime: {
      bg: "bg-[#0a0015]",
      card: "bg-[#0f0025] border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)]",
      accent: "text-cyan-400",
      btn: "bg-cyan-500 text-black hover:bg-white shadow-[0_0_20px_rgba(34,211,238,0.5)]",
      input: "focus:border-cyan-400",
      glow: "bg-cyan-400/10"
    },
    normal: {
      bg: "bg-[#f8f8f8]",
      card: "bg-white border-zinc-200 shadow-xl",
      accent: "text-zinc-900",
      btn: "bg-black text-white hover:bg-zinc-800 shadow-none",
      input: "focus:border-black text-black",
      glow: "bg-zinc-100"
    }
  }

  const s = skins[frecuencia] || skins.rap

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorVisible(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorVisible(error.message)
    } else {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className={`min-h-screen ${s.bg} flex items-center justify-center px-6 pt-20 transition-colors duration-700 relative overflow-hidden`}>
      
      {/* DECORACIÓN DE FONDO DINÁMICA */}
      <div className={`absolute w-[600px] h-[600px] ${s.glow} blur-[120px] rounded-full -top-48 -left-48 animate-pulse`} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full ${s.card} border p-10 rounded-3xl relative z-10 backdrop-blur-md transition-all duration-500`}
      >
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${frecuencia === 'normal' ? 'text-black' : 'text-white'}`}>
            CONTROL DE <span className={s.accent}>ACCESO</span>
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2 font-black italic">
            {frecuencia === 'anime' ? "SYSTEM_AUTHENTICATION_v2.0" : "Ingresa tus credenciales JimmWeb"}
          </p>
        </div>

        {errorVisible && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black uppercase text-center italic"
          >
            ERROR: {errorVisible}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-500 uppercase ml-4 tracking-widest italic">User_Identity</label>
            <input 
              type="email" 
              required 
              placeholder="EMAIL_DE_USUARIO"
              className={`w-full bg-black/20 border border-white/5 p-4 rounded-xl text-sm font-bold uppercase ${s.input} outline-none transition-all placeholder:text-zinc-700`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-500 uppercase ml-4 tracking-widest italic">Secret_Key</label>
            <input 
              type="password" 
              required 
              placeholder="CONTRASEÑA"
              className={`w-full bg-black/20 border border-white/5 p-4 rounded-xl text-sm font-bold ${s.input} outline-none transition-all placeholder:text-zinc-700`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${s.btn} py-5 rounded-2xl font-black uppercase italic text-xl transition-all duration-500 relative group overflow-hidden`}
          >
            <span className="relative z-10">
              {loading ? "AUTENTICANDO..." : "ENTRAR AL SISTEMA"}
            </span>
            {frecuencia !== 'normal' && (
               <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            ¿Nuevo en el bloque? <Link href="/register" className={`${frecuencia === 'normal' ? 'text-black' : 'text-white'} hover:${s.accent} transition-colors underline decoration-red-500/50 underline-offset-4`}>Crea tu cuenta</Link>
          </p>
        </div>
      </motion.div>

      {/* ELEMENTO TÉCNICO PARA MODO ANIME/RAP */}
      {frecuencia !== 'normal' && (
        <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-20 pointer-events-none">
          <p className={`text-[8px] font-mono ${s.accent}`}>IP_LOGGED: 192.168.1.1</p>
          <p className={`text-[8px] font-mono ${s.accent}`}>STatus: READY_FOR_DROP</p>
        </div>
      )}
    </div>
  )
}