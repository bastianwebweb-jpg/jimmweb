"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLoading) return 
    
    setIsLoading(true)
    console.log("1. Intentando acceso para:", email)

    try {
      // 2. Llamada a Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) {
        console.log("3. Error detectado:", error.message)
        alert("ERROR DE ACCESO: " + error.message)
        setIsLoading(false)
        return
      }

      if (data?.user) {
        console.log("4. Login exitoso para:", data.user.email)
        
        // Sincronizamos la sesión antes de saltar
        if (data.session) {
          await supabase.auth.setSession(data.session)
        }

        // REDIRECCIÓN FORZADA: Usamos window.location para romper el bloqueo del router
        // Esto obliga al Middleware a refrescarse y reconocer que eres ADMIN
        window.location.href = "/admin"
      }
    } catch (err) {
      console.error("5. Error inesperado:", err)
      alert("Error crítico de conexión.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* EFECTO DE LUZ ROJA ESTILO URBANO */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 blur-[100px]" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              CONTROL DE <span className="text-red-600">ACCESO</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-2">
              Ingresa tus credenciales Jimmweb
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                User_Identity
              </label>
              <input
                type="email"
                placeholder="EMAIL@EJEMPLO.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 p-4 text-sm font-bold uppercase focus:border-red-600 outline-none transition-colors text-white"
                required
              />
            </div>

            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                Secret_Key
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 p-4 text-sm font-bold focus:border-red-600 outline-none transition-colors text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-5 font-black uppercase italic text-xl transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)] ${
                isLoading 
                ? "bg-zinc-800 text-gray-500 cursor-not-allowed" 
                : "bg-red-600 text-white hover:bg-white hover:text-black hover:shadow-white/10"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AUTENTICANDO...
                </span>
              ) : (
                "ENTRAR AL BLOQUE"
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              ¿Nuevo en el bloque? <span className="text-white cursor-pointer hover:text-red-600 transition-colors">Crea tu cuenta</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}