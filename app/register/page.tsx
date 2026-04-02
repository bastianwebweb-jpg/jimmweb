"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      alert("ERROR DE RECLUTAMIENTO: " + error.message)
    } else {
      alert("REVISA TU EMAIL PARA CONFIRMAR TU ACCESO")
      router.push("/login")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-10 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            UNIRSE AL <span className="text-red-600">ARSENAL</span>
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2 font-bold">Crea tu credencial de acceso</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email_Usuario</label>
            <input 
              type="email" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none transition-all"
              placeholder="TU@EMAIL.COM"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Password_Segura</label>
            <input 
              type="password" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 font-black uppercase italic text-xl hover:bg-red-600 hover:text-white transition-all duration-500 shadow-[5px_5px_0px_0px_rgba(255,0,0,0.3)]"
          >
            {loading ? "PROCESANDO..." : "REGISTRAR ACCESO"}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          ¿Ya tienes cuenta? <Link href="/login" className="text-white hover:text-red-500 transition-colors underline decoration-red-600 underline-offset-4">Inicia Sesión aquí</Link>
        </p>
      </motion.div>
    </div>
  )
}