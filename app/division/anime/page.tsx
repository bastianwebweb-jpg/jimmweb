"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  description?: string;
}

export default function AnimeDivision() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('categoria', 'Anime'); // Filtramos solo por Anime
      
      if (!error && data) setProductos(data);
      setLoading(false);
    };
    fetchAnime();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0015] text-cyan-50 overflow-hidden">
      
      {/* --- FONDO ANIME OPTIMIZADO --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Velo para legibilidad */}
        <img 
          src="/images/anime-bg.jpg" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.5] contrast-125"
          alt="Anime Background"
        />
        {/* Efecto de escaneo (Scanlines) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-20" />
      </div>

      {/* --- HEADER --- */}
      <section className="relative z-30 pt-20 pb-10 px-6 max-w-7xl mx-auto">
        <Link href="/" className="text-xs font-black uppercase tracking-[0.4em] hover:text-cyan-400 transition-colors">
          [ ← VOLVER_AL_NEXO ]
        </Link>
        <div className="mt-10">
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">
            ANIME <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">ARSENAL</span>
          </h1>
          <p className="mt-4 text-xs md:text-sm font-bold uppercase tracking-[0.5em] opacity-50">
            Neo-Tokyo // Limited Drop 2026 // Culto Visual
          </p>
        </div>
      </section>

      {/* --- GRID DE PRODUCTOS --- */}
      <section className="relative z-30 px-6 pb-32 max-w-7xl mx-auto">
        {loading ? (
          <div className="h-64 flex items-center justify-center font-black italic animate-pulse">
            SINCRONIZANDO CON EL SERVIDOR...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {productos.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                {/* Header Técnico de la Card */}
                <div className="flex justify-between items-end mb-2 px-1">
                  <span className="text-[10px] font-black tracking-widest opacity-40">ID_{item.id.slice(0,8)}</span>
                  <span className="bg-cyan-500 text-black text-[9px] font-black px-2 py-0.5 skew-x-[-15deg]">
                    CAPTURA DISPONIBLE
                  </span>
                </div>

                {/* Contenedor de Imagen */}
                <div className="relative aspect-[4/5] overflow-hidden border border-cyan-500/20 bg-zinc-950">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-[0.3]"
                  />
                  
                  {/* Overlay de Precio Estilo Tag */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white text-black font-black text-xl px-4 py-1 shadow-[4px_4px_0px_#22d3ee]">
                      ${Number(item.precio).toLocaleString('es-CL')}
                    </div>
                  </div>

                  {/* Botón de Acción */}
                  <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button className="bg-cyan-400 text-black font-black px-8 py-3 uppercase italic tracking-tighter hover:scale-110 transition-transform">
                      CAPTURAR PIEZA [+]
                    </button>
                  </div>
                </div>

                {/* Info Inferior */}
                <div className="mt-4 border-l-2 border-cyan-500 pl-4">
                  <h2 className="text-2xl font-black uppercase italic leading-none group-hover:text-cyan-400 transition-colors">
                    {item.nombre}
                  </h2>
                  <p className="text-[10px] uppercase font-bold opacity-60 mt-1 tracking-widest">
                    Heavy Cotton // Screen Printed // HQ Finish
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* --- MARQUEE INFERIOR --- */}
      <footer className="fixed bottom-0 w-full bg-cyan-500 py-2 border-t border-cyan-300 z-50 overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-black font-black uppercase text-[10px] tracking-[0.3em]"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-10">
              SOLO PARA VERDADEROS COLECCIONISTAS • NO FAKES • CALIDAD PREMIUM • ENVÍOS A TODO EL PAÍS •
            </span>
          ))}
        </motion.div>
      </footer>
    </main>
  );
}