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

export default function DisneyDivision() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisney = async () => {
      setLoading(true);
      setDbError(null);
      try {
        // Filtrado por categoría "disney"
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .ilike('categoria', 'disney'); 

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
    fetchDisney();
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent">
      
      {/* --- FONDO DISNEY --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/20 to-purple-900/30 z-10" />
        <img 
          src="/images/disney-bg.jpg" 
          className="w-full h-full object-cover"
          alt="Disney Background"
        />
        {/* Efecto de partículas/estrellas sutil */}
        <div className="absolute inset-0 opacity-30 pointer-events-none z-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* --- CONTENIDO --- */}
      <div className="relative z-30">
        
        {/* HEADER ESTILO DREAMWAVE */}
        <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
          <Link href="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400/60 hover:text-cyan-400 transition-all">
            [ EXIT_SIMULATION ]
          </Link>
          
          <div className="mt-12">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]"
            >
              DREAM<span className="text-purple-500">WAVE</span> <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #22d3ee' }}>ARSENAL</span>
            </motion.h1>
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-cyan-400/60">
                Frequency: <span className="text-cyan-300">Fantasy_003</span>
              </p>
              <span className="h-[1px] w-12 bg-purple-500/30"></span>
              <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-purple-400/60">
                Status: <span className="text-purple-300">Magic_Kingdom_Loaded</span>
              </p>
            </div>
          </div>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="px-6 pb-40 max-w-7xl mx-auto min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
              <div className="w-20 h-20 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 animate-pulse">Iniciando protocolo de sueños...</p>
            </div>
          ) : dbError ? (
            <div className="border border-red-500/50 p-10 bg-red-950/20 backdrop-blur-md text-center">
              <p className="text-red-500 font-black uppercase italic">System_Failure: {dbError}</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="border border-purple-500/20 p-20 text-center backdrop-blur-md bg-black/40">
              <p className="text-4xl font-black uppercase italic text-purple-500/20">AWAITING_DROP</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {productos.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  {/* Card con borde neón suave */}
                  <div className="relative bg-zinc-950/40 border border-white/5 p-4 backdrop-blur-md group-hover:border-cyan-500/50 transition-all duration-500">
                    
                    {/* Badge */}
                    <div className="absolute -top-3 left-4 z-40 bg-cyan-500 text-black text-[8px] font-black px-4 py-1 uppercase tracking-widest">
                      Ref: {item.id.slice(0, 5)}
                    </div>

                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      {/* Overlay Glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="mt-8">
                      <h2 className="text-xl font-black uppercase tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">
                        {item.nombre}
                      </h2>
                      <div className="flex justify-between items-end mt-6">
                        <div>
                          <p className="text-[8px] uppercase tracking-widest text-purple-400 mb-1">Price_Tag</p>
                          <p className="text-2xl font-black italic text-white">
                            ${Number(item.precio).toLocaleString('es-CL')}
                          </p>
                        </div>
                        <button className="text-[9px] font-black bg-white text-black hover:bg-cyan-500 hover:text-white transition-all uppercase px-6 py-3">
                          Capture_Dream
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sombra de neón trasera */}
                  <div className="absolute inset-0 bg-purple-500/5 blur-2xl -z-10 group-hover:bg-cyan-500/10 transition-all" />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* FOOTER MARQUEE */}
      <footer className="fixed bottom-0 w-full bg-white py-2 z-50 overflow-hidden">
        <div className="flex whitespace-nowrap text-black font-black uppercase text-[10px] tracking-[0.5em]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="mx-12">
                DREAMWAVE // DISNEY ARSENAL // LIMITED DROP // JIMMWEB.CL // MAGIC KINGDOM 2026 // DREAMS OVERLAY ACTIVE //
              </span>
            ))}
          </motion.div>
        </div>
      </footer>
    </main>
  );
}