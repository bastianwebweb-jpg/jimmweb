"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

export default function GamesDivision() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .ilike('categoria', 'games'); 

      if (!error) setProductos(data || []);
      setLoading(false);
    };
    fetchGames();
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-black font-sans">
      
      {/* --- FONDO ARCADE CON OVERLAY VERDE --- */}
      <div className="fixed inset-0 z-0">
        {/* Capa de tinte verdoso para unificar con el home */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/40 via-black/40 to-black z-10" />
        <img 
          src="/images/games-bg.jpg" 
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          alt="Arcade Background"
        />
        {/* Scanlines y ruido digital */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.1),rgba(0,255,0,0.02),rgba(0,255,0,0.1))] bg-[length:100%_2px,3px_100%]" />
      </div>

      {/* --- INTERFAZ DE USUARIO (HUD) --- */}
      <div className="relative z-30">
        
        {/* TOP BAR */}
        <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center border-b border-green-500/30 pb-4">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-green-500 hover:text-white transition-all">
              {"< RETURN_TO_BASE"}
            </Link>
            <div className="flex space-x-6 text-[10px] font-mono text-green-400">
              <span className="animate-pulse">SYSTEM_STABLE</span>
              <span>GPU_TEMP: 42°C</span>
            </div>
          </div>
          
          {/* TÍTULO PRINCIPAL EN VERDE NEÓN */}
          <div className="mt-16">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-8xl md:text-[11rem] font-black italic tracking-tighter uppercase leading-[0.75] text-white"
            >
              GAMES<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #22c55e' }}>ARSENAL</span>
            </motion.h1>
            <p className="mt-8 text-xs font-mono uppercase tracking-[0.5em] text-green-500/80 bg-green-500/10 inline-block px-4 py-1">
              Terminal Active // Awaiting Input_
            </p>
          </div>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="px-6 pb-40 max-w-7xl mx-auto">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center font-mono">
              <p className="text-green-500 animate-pulse tracking-[0.3em]">FETCHING_DATA...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productos.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="relative group border border-green-500/10 bg-zinc-950/80 backdrop-blur-sm p-4 hover:border-green-500/50 transition-all duration-500"
                >
                  {/* Etiqueta de ID técnica */}
                  <div className="mb-4 flex justify-between items-center text-[9px] font-mono text-green-500/50">
                    <span>ITEM_ID: {item.id.slice(0, 8)}</span>
                    <span className="group-hover:text-green-400">[ OK ]</span>
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden bg-black mb-6">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Overlay de glitch verde en hover */}
                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                  </div>

                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-green-400 transition-colors">
                    {item.nombre}
                  </h2>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-green-500">
                      ${Number(item.precio).toLocaleString('es-CL')}
                    </span>
                    <button className="text-[10px] font-black border border-green-500 text-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition-all uppercase">
                      Execute_Purchase
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* MARQUEE INFERIOR - VERDE MATRIX */}
      <footer className="fixed bottom-0 w-full bg-green-500 py-2 z-50 overflow-hidden shadow-[0_-10px_30px_rgba(34,197,94,0.2)]">
        <div className="flex whitespace-nowrap text-black font-black uppercase text-[10px] tracking-[0.5em]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="mx-12">
                &gt; GAMES_ARSENAL // USER: BASTIAN_VIDAL // HIGH_PERFORMANCE_APPAREL // READY_PLAYER_ONE //
              </span>
            ))}
          </motion.div>
        </div>
      </footer>
    </main>
  );
}