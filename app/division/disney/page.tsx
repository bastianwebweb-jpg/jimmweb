"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"

export default function DisneyDivision() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDisney() {
      const { data } = await supabase.from('productos').select('*').ilike('categoria', 'disney');
      setProductos(data || []);
      setLoading(false);
    }
    fetchDisney();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0f0a1a] flex items-center justify-center text-rose-200 italic font-serif">Cargando Magia...</div>;

  return (
    <main className="relative min-h-screen bg-[#0f0a1a] text-white overflow-hidden font-serif italic">
      
      {/* FONDO MÍSTICO EXCLUSIVO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547944212-c4f496732867?q=80&w=1920')] bg-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0a1a]" />
        {/* Partículas de estrellas */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:40px_40px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <header className="mb-24 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-rose-300 tracking-[0.5em] text-xs uppercase">The Magical Collection</span>
            <h1 className="text-7xl md:text-9xl font-black uppercase leading-none tracking-tighter mt-4 drop-shadow-lg">
              DISNEY <br /> <span className="text-rose-300">ARSENAL</span>
            </h1>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {productos.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -15 }} className="group">
              <div className="bg-white/5 backdrop-blur-md border border-rose-300/20 rounded-[3rem] overflow-hidden transition-all group-hover:border-rose-300/50 shadow-xl">
                <div className="relative aspect-[3/4]">
                  <img src={item.imagen} className="w-full h-full object-cover" />
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-rose-200 text-indigo-950 flex items-center justify-center font-black not-italic shadow-lg">
                    ${Number(item.precio).toLocaleString('es-CL')}
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold uppercase mb-6 tracking-tight">{item.nombre}</h3>
                  <button className="w-full py-4 bg-gradient-to-r from-rose-300 to-amber-200 text-indigo-950 font-black rounded-full text-xs tracking-widest hover:scale-105 transition-transform">
                    HACERLO MÍO
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}