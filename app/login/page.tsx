"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("ACCESO DENEGADO: " + error.message)
    } else {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-10 rounded-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            CONTROL DE <span className="text-red-600">ACCESO</span>
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2 font-bold">Ingresa tus credenciales JimmWeb</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            required 
            placeholder="EMAIL_DE_USUARIO"
            className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold uppercase focus:border-red-600 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            required 
            placeholder="CONTRASEÑA"
            className="w-full bg-white/5 border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 font-black uppercase italic text-xl hover:bg-white hover:text-black transition-all duration-500 shadow-[0_10px_20px_-5px_rgba(220,38,38,0.4)]"
          >
            {loading ? "AUTENTICANDO..." : "ENTRAR AL SISTEMA"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            ¿Nuevo en el bloque? <Link href="/register" className="text-white hover:text-red-500 transition-colors">Crea tu cuenta</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}