"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCart } from "@/store/cart"
import { useTheme } from "@/store/theme" 
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const items = useCart((state) => state.items)
  const toggleCart = useCart((state) => state.toggleCart)
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  
  const { frecuencia, setFrecuencia } = useTheme()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const totalUnidades = items.reduce((acc, item) => acc + item.cantidad, 0)

  // 1. Configuración de estilos según la frecuencia activa
  const themeSkins = {
    rap: {
      accent: "text-red-600",
      bgAccent: "bg-red-600",
      border: "border-red-600/20",
      navBg: "bg-black/80",
      hover: "group-hover:text-red-500",
      cartBorder: "group-hover:border-red-600/50"
    },
    anime: {
      accent: "text-cyan-400",
      bgAccent: "bg-cyan-500",
      border: "border-cyan-500/20",
      navBg: "bg-[#0a0015]/80",
      hover: "group-hover:text-cyan-400",
      cartBorder: "group-hover:border-cyan-500/50"
    },
    normal: {
      accent: "text-black",
      bgAccent: "bg-black",
      border: "border-zinc-200",
      navBg: "bg-white/80",
      hover: "group-hover:text-zinc-600",
      cartBorder: "group-hover:border-black"
    }
  }

  const s = themeSkins[frecuencia] || themeSkins.rap

  const frecuencias = [
    { id: 'rap', label: 'RAP', activeColor: 'bg-red-600' },
    { id: 'anime', label: 'NEO', activeColor: 'bg-cyan-500' },
    { id: 'normal', label: 'MIN', activeColor: 'bg-black' }
  ]

  return (
    <nav className={`fixed top-0 w-full z-[100] border-b ${s.border} ${s.navBg} backdrop-blur-xl px-4 md:px-6 py-4 transition-all duration-500`}>
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        
        {/* LOGO DINÁMICO */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.02 }} className="relative group cursor-pointer">
            <h1 className={`text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none flex items-center ${frecuencia === 'normal' ? 'text-zinc-900' : 'text-white'}`}>
              JIMM<span className={`${s.accent} group-hover:text-white transition-colors duration-300`}>WEB</span>
              <span className={`ml-2 text-[8px] ${s.bgAccent} text-white px-1 py-0.5 not-italic tracking-widest hidden md:block`}>V1.1</span>
            </h1>
          </motion.div>
        </Link>

        {/* ACCIONES */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* SELECTOR DE FRECUENCIA */}
          <div className={`hidden lg:flex items-center gap-1 ${frecuencia === 'normal' ? 'bg-zinc-100' : 'bg-white/5'} p-1 rounded-full border ${s.border} mr-2 transition-colors`}>
            {frecuencias.map((f) => (
              <button
                key={f.id}
                onClick={() => setFrecuencia(f.id as any)}
                className={`text-[8px] font-black px-3 py-1 rounded-full transition-all duration-300 uppercase tracking-widest
                  ${frecuencia === f.id 
                    ? `${f.activeColor} text-white scale-105 shadow-lg` 
                    : 'text-zinc-500 hover:text-zinc-400'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* LINK ARSENAL REACCIONA AL TEMA */}
          <Link href="/producto">
            <button className="group relative overflow-hidden py-2 px-1 hidden sm:block">
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${pathname === '/producto' ? s.accent : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                [ VER_ARSENAL ]
              </span>
              <div className={`absolute bottom-0 left-0 h-[2px] ${s.bgAccent} transition-all duration-500 ${pathname === '/producto' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          </Link>

          {/* AUTH SECCIÓN */}
          <div className={`flex items-center border-x ${frecuencia === 'normal' ? 'border-zinc-200' : 'border-white/10'} px-2 md:px-6 gap-4`}>
            {user ? (
              <>
                {user.email === 'bastianvidal30@gmail.com' && (
                  <Link href="/admin" className={`text-[9px] font-black ${s.accent} hover:text-white transition-colors uppercase tracking-widest hidden md:block`}>
                    [ CONTROL_PANEL ]
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className={`text-[9px] font-black text-zinc-500 hover:${s.accent} transition-colors uppercase tracking-widest`}
                >
                  SALIR
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link href="/login" className={`text-[9px] font-black uppercase tracking-widest ${pathname === '/login' ? s.accent : 'text-zinc-500 hover:text-zinc-400'}`}>
                  LOGIN
                </Link>
                <Link href="/register" className={`text-[9px] font-black uppercase tracking-widest ${frecuencia === 'normal' ? 'bg-black text-white' : 'bg-white text-black'} px-2 py-1 hover:${s.bgAccent} hover:text-white transition-all hidden md:block`}>
                  REGISTRO
                </Link>
              </div>
            )}
          </div>

          {/* CARRITO DINÁMICO */}
          <div className="relative group cursor-pointer" onClick={toggleCart}>
            <motion.div 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-3 py-2 border ${frecuencia === 'normal' ? 'border-zinc-200 bg-white' : 'border-white/10 bg-white/5'} rounded-lg ${s.cartBorder} transition-all`}
            >
              <div className="relative">
                <svg className={`w-5 h-5 ${frecuencia === 'normal' ? 'text-black' : 'text-white'} ${s.hover} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalUnidades > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className={`absolute -top-3 -right-3 ${s.bgAccent} text-white text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full border border-black shadow-lg`}
                  >
                    {totalUnidades}
                  </motion.span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  )
}