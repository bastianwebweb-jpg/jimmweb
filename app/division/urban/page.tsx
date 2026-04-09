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

export default function UrbanDivision() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrban = async () => {
      setLoading(true);
      setDbError(null);
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .ilike('categoria', 'urban'); 

        if (error) {
          setDbError(error.message);
        } else {
          setProductos(data || []);
        }
      } catch (err) {
        setDbError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };
    fetchUrban();
  }, []);

  return (
    <main className="relative min-h-screen text-zinc-100 overflow-hidden bg-transparent">
      
      {/* --- FONDO URBAN FINAL --- */}
      <div className="fixed inset-0 z-0">
        {/* Overlay degradado para mejorar legibilidad del header */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-10" />
        <img 
          src="/images/urban-bg.jpg" 
          className="w-full h-full object-cover"
          alt="Urban Background"
        />
        {/* Textura de asfalto opcional */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-20 bg-[url('https://www.transparenttextures.com/patterns/asphalt-dark.png')]" />
      </div>

      {/* --- CAPA DE CONTENIDO --- */}
      <div className="relative z-30">
        
        {/* HEADER */}
        <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
          <Link href="/" className="group flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/60 hover:text-amber-400 transition-all">
            <span>[</span> <span className="group-hover:px-2 transition-all">BACK_TO_STREETS</span> <span>]</span>
          </Link>
          
          <div className="mt-12">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] text-white"
            >
              URBAN <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #fbbf24' }}>DISTRICT</span>
            </motion.h1>
            <p className="mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] text-amber-500/40">
              Location: <span className="text-amber-400">Underground</span> // Status: <span className="text-amber-400">Street_Files_Loaded</span>
            </p>
          </div>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="px-6 pb-40 max-w-7xl mx-auto min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
              <div className="w-16 h-[2px] bg-amber-500/20 relative overflow-hidden">
                <motion.div 
                  animate={{ x: [-64, 64] }} 
                  transition={{ repeat: Infinity, duration: 1 }} 
                  className="absolute inset-0 bg-amber-500" 
                />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/50">Cargando Arsenal...</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="border border-amber-500/10 p-20 text-center backdrop-blur-md bg-black/40">
              <p className="text-4xl font-black uppercase italic text-amber-500/10 italic">OUT_OF_STOCK</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productos.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative bg-zinc-950/40 border border-white/5 p-4 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-500"
                >
                  {/* Badge Estilo Street */}
                  <div className="absolute -top-2 -right-2 z-40 bg-amber-500 text-black text-[9px] font-black px-3 py-1 uppercase -rotate-2 group-hover:rotate-0 transition-transform">
                    STREET_PIECE
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/10">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="bg-amber-400 text-black font-black text-2xl px-3 py-1 italic shadow-xl">
                        ${Number(item.precio).toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-amber-400 transition-colors duration-300">
                      {item.nombre}
                    </h2>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                      <span className="text-[8px] font-bold opacity-20 tracking-widest uppercase italic">Jimmweb_Archives</span>
                      <button className="text-[10px] font-black text-amber-500 hover:text-white transition-all uppercase border border-amber-500/20 px-4 py-2 hover:bg-amber-500 hover:border-amber-500">
                        CAPTURA EL DROP
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* FOOTER MARQUEE */}
      <footer className="fixed bottom-0 w-full bg-amber-500 py-2 z-50 overflow-hidden border-t border-black/10">
        <div className="flex whitespace-nowrap text-black font-black uppercase text-[10px] tracking-[0.5em]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(8)].map((_, i) => (
              <span key={i} className="mx-12">
                URBAN DISTRICT // RAW STREETWEAR // AUTHENTIC CULTURE // NO FAKES // JIMMWEB.CL // 2026 //
              </span>
            ))}
          </motion.div>
        </div>
      </footer>
    </main>
  );
}