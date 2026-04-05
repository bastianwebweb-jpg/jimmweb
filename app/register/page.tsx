"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient" // Ajustado a tu instancia
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/store/theme" // 1. IMPORTAR THEME

export default function RegisterPage() {
  const { frecuencia } = useTheme() // 2. CONSUMIR FRECUENCIA
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const router = useRouter()

  // 3. PIELES PARA EL REGISTRO
  const skins = {
    rap: {
      bg: "bg-black",
      card: "bg-[#0a0a0a] border-white/10 shadow-[10px_10px_0px_0px_rgba(220,38,38,0.2)]",
      accent: "text-red-600",
      btn: "bg-white text-black hover:bg-red-600 hover:text-white shadow-[5px_5px_0px_0px_rgba(220,38,38,0.4)]",
      input: "focus:border-red-600",
      title: "NEW MEMBER"
    },
    anime: {
      bg: "bg-[#0a0015]",
      card: "bg-[#0f0025] border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]",
      accent: "text-cyan-400",
      btn: "bg-cyan-500 text-black hover:bg-white shadow-[0_0_15px_rgba(34,211,238,0.5)]",
      input: "focus:border-cyan-400",
      title: "NUEVO RECLUTA_NEO"
    },
    normal: {
      bg: "bg-[#f8f8f8]",
      card: "bg-white border-zinc-200 shadow-sm",
      accent: "text-zinc-900",
      btn: "bg-black text-white hover:bg-zinc-800 shadow-none",
      input: "focus:border-black text-black",
      title: "CREAR CUENTA"
    }
  }

  const s = skins[frecuencia] || skins.rap

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: "ERROR DE RECLUTAMIENTO: " + error.message })
    } else {
      setMessage({ type: 'success', text: "REVISA TU EMAIL PARA CONFIRMAR TU ACCESO" })
      setTimeout(() => router.push("/login"), 3000)
    }
    setLoading(false)
  }

  return (
    <div className={`min-h-screen ${s.bg} flex items-center justify-center px-6 pt-20 transition-colors duration-700`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-md w-full ${s.card} border p-10 rounded-2xl relative transition-all duration-500`}
      >
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${frecuencia === 'normal' ? 'text-black' : 'text-white'}`}>
            {s.title.split(' ')[0]} <span className={s.accent}>{s.title.split(' ')[1]}</span>
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-2 font-black">Crea tu credencial de acceso</p>
        </div>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 border text-[10px] font-black uppercase text-center italic ${
              message.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-green-500/10 border-green-500/50 text-green-500'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Email_Usuario</label>
            <input 
              type="email" 
              required 
              placeholder="TU@EMAIL.COM"
              className={`w-full ${frecuencia === 'normal' ? 'bg-zinc-50' : 'bg-white/5'} border border-white/10 p-4 text-sm font-bold uppercase ${s.input} outline-none transition-all rounded-xl`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Password_Segura</label>
            <input 
              type="password" 
              required 
              placeholder="••••••••"
              className={`w-full ${frecuencia === 'normal' ? 'bg-zinc-50' : 'bg-white/5'} border border-white/10 p-4 text-sm font-bold ${s.input} outline-none transition-all rounded-xl`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${s.btn} py-5 rounded-xl font-black uppercase italic text-xl transition-all duration-500`}
          >
            {loading ? "PROCESANDO..." : "REGISTRAR ACCESO"}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          ¿Ya tienes cuenta? <Link href="/login" className={`${frecuencia === 'normal' ? 'text-black' : 'text-white'} hover:${s.accent} transition-colors underline decoration-red-600 underline-offset-4`}>Inicia Sesión aquí</Link>
        </p>

        {/* Decoración estética según frecuencia */}
        {frecuencia === 'anime' && (
          <div className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none" />
        )}
      </motion.div>
    </div>
  )
}