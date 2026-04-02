"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCart } from "@/store/cart"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const items = useCart((state) => state.items)
  const toggleCart = useCart((state) => state.toggleCart)
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  // 1. Escuchar el estado de la sesión
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

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/80 backdrop-blur-xl px-4 md:px-6 py-4">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/">
          <motion.div whileHover={{ scale: 1.02 }} className="relative group cursor-pointer">
            <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none flex items-center">
              JIMM<span className="text-red-600 group-hover:text-white transition-colors duration-300">WEB</span>
              <span className="ml-2 text-[8px] bg-red-600 text-white px-1 py-0.5 not-italic tracking-widest hidden md:block">V1.1</span>
            </h1>
          </motion.div>
        </Link>

        {/* ACCIONES */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* LINK ARSENAL */}
          <Link href="/producto">
            <button className="group relative overflow-hidden py-2 px-1 hidden sm:block">
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${pathname === '/producto' ? 'text-red-600' : 'text-gray-400 group-hover:text-white'}`}>
                [ VER_ARSENAL ]
              </span>
              <div className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-500 ${pathname === '/producto' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          </Link>

          {/* AUTH SECCIÓN */}
          <div className="flex items-center border-x border-white/10 px-2 md:px-6 gap-4">
            {user ? (
              <>
                {/* Si es tu email, mostramos acceso al admin */}
                {user.email === 'bastianvidal30@gmail.com' && (
                  <Link href="/admin" className="text-[9px] font-black text-red-500 hover:text-white transition-colors uppercase tracking-widest hidden md:block">
                    [ CONTROL_PANEL ]
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-[9px] font-black text-gray-500 hover:text-red-600 transition-colors uppercase tracking-widest"
                >
                  SALIR
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link href="/login" className={`text-[9px] font-black uppercase tracking-widest ${pathname === '/login' ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                  LOGIN
                </Link>
                <Link href="/register" className="text-[9px] font-black uppercase tracking-widest bg-white text-black px-2 py-1 hover:bg-red-600 hover:text-white transition-all hidden md:block">
                  REGISTRO
                </Link>
              </div>
            )}
          </div>

          {/* CARRITO */}
          <div className="relative group cursor-pointer" onClick={toggleCart}>
            <motion.div 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-3 py-2 border border-white/10 bg-white/5 rounded-lg group-hover:border-red-600/50 transition-all"
            >
              <div className="relative">
                <svg className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalUnidades > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-red-600 text-white text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full border border-black shadow-[0_0_8px_rgba(220,38,38,0.5)]"
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