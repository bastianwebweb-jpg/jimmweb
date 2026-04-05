"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"

export default function DivisionPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("");

  const skins: Record<string, any> = {
    urban: {
      bg: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920')",
      accent: "text-yellow-400",
      btn: "bg-yellow-500 text-black",
      tagline: "STREET CULTURE // ARSENAL",
      font: "font-sans italic",
      card: "rounded-none border-white/10"
    },
    rap: {
      bg: "url('https://images.unsplash.com/photo-1516562309708-05f3b2b2c238?q=80&w=1920')", 
      accent: "text-red-600",
      btn: "bg-red-600 text-white",
      tagline: "RAW BEATS // UNDERGROUND LYRICS",
      font: "font-black italic",
      card: "rounded-none border-red-600/30",
      extra: "noise"
    },
    anime: {
      bg: "url('https://images.unsplash.com/photo-1542641728-6ca359b085f4?q=80&w=1920')", 
      accent: "text-cyan-400",
      btn: "bg-cyan-500 text-black",
      tagline: "NEO-TOKYO // アニメディビジョン",
      font: "font-bold",
      card: "border-cyan-500/50 clip-path-slant",
      extra: "scanlines"
    },
    games: {
      bg: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920')", 
      accent: "text-purple-500",
      btn: "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]",
      tagline: "ELITE GEAR // LEVEL UP YOUR STYLE",
      font: "font-mono italic",
      card: "border-purple-500/20",
      extra: "hud"
    },
    disney: {
      bg: "url('https://images.unsplash.com/photo-1579547944212-c4f496732867?q=80&w=1920')", 
      accent: "text-rose-300",
      btn: "bg-gradient-to-r from-rose-300 to-amber-200 text-indigo-950 shadow-lg",
      tagline: "WALT DISNEY ARSENAL // MAGIC EDITION",
      font: "font-serif italic",
      card: "rounded-[3rem] border-rose-300/20 shadow-rose-300/10",
      extra: "stars"
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    const slug = path.split("/").pop() || "";
    setCategoria(slug.toLowerCase());

    async function fetchArsenal() {
      if (!slug) return;
      try {
        const { data, error } = await supabase.from('productos').select('*').ilike('categoria', slug.trim());
        if (error) throw error;
        setProductos(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchArsenal();
  }, []);

  const s = skins[categoria] || skins.urban;

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white font-black italic text-2xl animate-pulse tracking-tighter">SINCRONIZANDO ARSENAL...</div>
    </div>
  );

  return (
    <main className={`relative min-h-screen w-full transition-colors duration-1000 ${categoria === 'disney' ? 'bg-[#0f0a1a]' : 'bg-[#050505]'} text-white overflow-hidden`}>
      
      {/* CAPA DE FONDO DINÁMICA */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <div className={`absolute inset-0 bg-cover bg-center ${categoria !== 'disney' ? 'grayscale contrast-125 opacity-20' : 'opacity-40'}`} 
             style={{ backgroundImage: s.bg }} />
        <div className={`absolute inset-0 ${categoria === 'disney' ? 'bg-gradient-to-b from-transparent to-[#0f0a1a]' : 'bg-black/60'}`} />
      </div>

      {/* EFECTOS ESPECIALES POR DIVISIÓN */}
      {s.extra === 'noise' && <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />}
      {s.extra === 'scanlines' && <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />}
      {s.extra === 'stars' && <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse opacity-20" />}

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <header className="relative mb-24">
          {/* TEXTO FANTASMA DE FONDO */}
          <h2 className={`absolute -top-20 -left-10 text-[15rem] md:text-[22rem] font-black uppercase opacity-[0.03] select-none leading-none tracking-tighter`}
              style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
            {categoria}
          </h2>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <p className={`${s.accent} font-mono text-[10px] tracking-[0.5em] mb-4 uppercase bg-white/5 inline-block px-2 py-1`}>
              {s.tagline}
            </p>
            <h1 className={`text-8xl md:text-[11rem] ${s.font} uppercase leading-[0.8] tracking-tighter drop-shadow-2xl`}>
              {categoria} <br />
              <span className={s.accent}>ARSENAL</span>
            </h1>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {productos.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -12 }}
              className={`relative group bg-zinc-900/60 backdrop-blur-md border ${s.card} transition-all duration-500 overflow-hidden shadow-2xl`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={item.imagen} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${categoria !== 'disney' ? 'grayscale-[40%] group-hover:grayscale-0' : ''}`} />
                
                {/* PRECIO DINÁMICO */}
                <div className={`absolute ${categoria === 'disney' ? 'top-6 right-6 w-16 h-16 rounded-full flex items-center justify-center bg-amber-100 text-indigo-950 font-black' : 'bottom-0 left-0 bg-white text-black px-4 py-2 font-black italic text-xl'}`}>
                  ${Number(item.precio).toLocaleString('es-CL')}
                </div>
              </div>

              <div className="p-8">
                <h3 className={`text-2xl ${s.font} uppercase tracking-tighter mb-6 group-hover:${s.accent.replace('text', 'text')} transition-colors`}>
                  {item.nombre}
                </h3>
                <button className={`w-full py-4 ${s.btn} font-black text-[10px] uppercase tracking-widest transition-all ${categoria === 'disney' ? 'rounded-full' : 'hover:skew-x-[-10deg]'}`}>
                  {categoria === 'disney' ? 'MAKE IT YOURS' : 'GET PIECE +'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MARQUEE INFERIOR (Solo Rap) */}
      {categoria === 'rap' && (
        <div className="fixed bottom-0 w-full bg-red-600 text-black py-1 overflow-hidden whitespace-nowrap z-50 font-black italic text-xs uppercase">
          <div className="animate-marquee flex gap-10">
            <span>JIMMWEB RAP DIVISION // NO FAKES ALLOWED // CHILEAN UNDERGROUND //</span>
            <span>JIMMWEB RAP DIVISION // NO FAKES ALLOWED // CHILEAN UNDERGROUND //</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-marquee { animation: marquee 15s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .clip-path-slant { clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%); }
      `}</style>
    </main>
  );
}