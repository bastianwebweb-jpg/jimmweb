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

export default function AnimeDivision() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setDbError(null);

      try {
        // Usamos .ilike para que encuentre "anime" aunque esté en minúsculas en la DB
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .ilike('categoria', 'anime'); 

        if (error) {
          console.error("❌ Error de Supabase:", error.message);
          setDbError(error.message);
        } else {
          setProductos(data || []);
        }
      } catch (err) {
        console.error("❌ Error inesperado:", err);
        setDbError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0015] text-cyan-50 overflow-hidden">
      {/* --- FONDO ANIME DIAGNÓSTICO --- */}
        <div className="fixed inset-0 z-0"> {/* Cambiado a fixed y z-0 para asegurar posición */}
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Velo negro */}
        <img 
            src="/images/anime-bg.jpg" 
            className="w-full h-full object-cover opacity-100" // Opacidad al 100% para probar
            style={{ border: '5px solid red' }} // BORDE TEMPORAL PARA DIAGNÓSTICO
            alt="Fondo de prueba"
            onLoad={() => console.log("✅ Imagen cargada correctamente")}
            onError={() => console.error("❌ La imagen falló al cargar en /images/anime-bg.jpg")}
        />
        </div>

      {/* --- HEADER --- */}
      <section className="relative z-30 pt-20 pb-10 px-6 max-w-7xl mx-auto">
        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400/60 hover:text-cyan-400 transition-all">
          [ RETURN_TO_NEXUS ]
        </Link>
        <div className="mt-10">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]"
          >
            ANIME <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #22d3ee' }}>ARSENAL</span>
          </motion.h1>
          <p className="mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.6em] text-cyan-400/40">
            System.Status: <span className="text-cyan-400">Online</span> // Protocol: <span className="text-cyan-400">Neo-Tokyo</span>
          </p>
        </div>
      </section>

      {/* --- GRID DE PRODUCTOS --- */}
      <section className="relative z-30 px-6 pb-32 max-w-7xl mx-auto min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="font-black italic text-cyan-400 tracking-widest text-xs uppercase">Accediendo al archivo...</p>
          </div>
        ) : dbError ? (
          <div className="bg-red-900/20 border border-red-500 p-6 text-center">
            <p className="text-red-500 font-black uppercase tracking-tighter">Error de Sincronización</p>
            <p className="text-[10px] text-red-400/60 mt-2">{dbError}</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="border border-cyan-400/20 p-20 text-center backdrop-blur-md">
            <p className="text-4xl font-black uppercase italic text-cyan-400/20">DROP_EMPTY</p>
            <p className="text-[10px] uppercase tracking-widest mt-4 opacity-40">No se encontraron piezas en esta frecuencia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {productos.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="group relative bg-black/40 border border-white/5 p-3"
              >
                {/* ID Tag */}
                <div className="absolute -top-3 left-6 z-40 bg-cyan-400 text-black text-[8px] font-black px-2 py-0.5 uppercase italic">
                  Ref_{item.id.slice(0,6)}
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Badge de Precio */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-white text-black font-black text-2xl px-4 py-1 italic skew-x-[-10deg] shadow-[4px_4px_0px_#22d3ee]">
                      ${Number(item.precio).toLocaleString('es-CL')}
                    </div>
                  </div>
                </div>

                <div className="mt-5 px-2">
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-cyan-400 transition-colors">
                    {item.nombre}
                  </h2>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] font-bold opacity-30 tracking-[0.2em] uppercase">High_Tier_Merch</span>
                    <button className="text-[10px] font-black text-cyan-400 hover:text-white transition-colors uppercase tracking-widest">
                      [ Capturar ]
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* --- FOOTER MARQUEE --- */}
      <footer className="fixed bottom-0 w-full bg-cyan-400 py-1.5 z-50 overflow-hidden">
        <div className="flex whitespace-nowrap text-black font-black uppercase text-[9px] tracking-[0.4em]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8 italic">
                ANIME ARSENAL // LIMITED DROP // JIMMWEB CL // 2026 // NEO TOKYO STYLE // 
              </span>
            ))}
          </motion.div>
        </div>
      </footer>
    </main>
  );
}