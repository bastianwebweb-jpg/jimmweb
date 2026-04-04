"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "@/store/theme" // Asegúrate de tener este store creado

export default function ProductsClient({ products }: any) {
  const { frecuencia } = useTheme()

  // --- CONFIGURACIÓN DE PIELES (SKINS) ---
  const skins = {
    rap: {
      bg: "bg-[#050505]",
      text: "text-white",
      accent: "text-red-500",
      accentBg: "bg-red-600",
      border: "border-red-600",
      glow: "bg-red-600/10",
      textura: "opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]",
      card: "from-[#151515] to-[#050505]",
      priceTag: "bg-red-600 text-white"
    },
    anime: {
      bg: "bg-[#0a0015]",
      text: "text-cyan-50",
      accent: "text-cyan-400",
      accentBg: "bg-cyan-500",
      border: "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
      glow: "bg-cyan-500/10",
      textura: "opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]",
      card: "from-[#1a0033] to-[#0a0015]",
      priceTag: "bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.8)]"
    },
    normal: {
      bg: "bg-[#f8f8f8]",
      text: "text-black",
      accent: "text-zinc-900",
      accentBg: "bg-black",
      border: "border-zinc-200",
      glow: "bg-zinc-200/50",
      textura: "opacity-0",
      card: "from-white to-[#f0f0f0]",
      priceTag: "bg-black text-white"
    }
  }

  const s = skins[frecuencia] || skins.rap

  if (!products || products.length === 0) {
    return (
      <div className={`min-h-screen ${s.bg} flex items-center justify-center`}>
        <p className={`${s.text} text-3xl font-black uppercase italic animate-pulse tracking-tighter`}>
          BUSCANDO EL <span className={`${s.accent} text-4xl`}>ARSENAL...</span>
        </p>
      </div>
    )
  }

  return (
    <main className={`min-h-screen ${s.bg} ${s.text} transition-colors duration-700 overflow-hidden relative font-sans`}>
      
      {/* --- CAPAS DE TEXTURA DINÁMICAS --- */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ${s.textura}`} />
      
      {/* Capa de Ruido (Solo para estilos oscuros) */}
      {frecuencia !== 'normal' && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />
      )}

      {/* El Resplandor Dinámico */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] ${s.glow} blur-[160px] -z-20 transition-colors duration-1000`} />
      
      {/* Viñeta lateral (Solo RAP y ANIME) */}
      {frecuencia !== 'normal' && (
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 pointer-events-none" />
      )}

      <div className="max-w-8xl mx-auto px-6 py-20 md:py-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            <span className={`absolute -top-12 -left-8 ${frecuencia === 'normal' ? 'text-black/5' : 'text-white/5'} text-[12rem] font-black italic select-none leading-none`}>
              {frecuencia === 'anime' ? 'NEO' : 'STREET'}
            </span>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter relative">
              DROP <br />
              <span className={`${s.accent} not-italic drop-shadow-2xl`}>
                {frecuencia === 'anime' ? 'DIGITAL' : 'EXCLUSIVE'}
              </span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-10 border-l-4 ${s.border} pl-6 transition-colors duration-700`}
          >
            <p className={`${frecuencia === 'normal' ? 'text-zinc-500' : 'text-gray-400'} text-2xl md:text-3xl font-black uppercase tracking-tighter`}>
              No seguimos tendencias. <span className={s.text}>Las quemamos.</span>
            </p>
            <p className={`mt-2 text-sm font-medium tracking-[0.3em] uppercase ${s.accent} opacity-60`}>
              Colección 2026 // Concepción, Chile
            </p>
          </motion.div>
        </section>

        {/* GRID DE PRODUCTOS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
          {products.map((product: any, i: number) => (
            <Link key={product.id} href={`/producto/${product.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group relative cursor-pointer"
              >
                {/* PRECIO TAG DINÁMICO */}
                <div className="absolute top-0 right-10 z-30 pointer-events-none group-hover:-translate-y-1 transition-transform duration-500">
                  <div className={`relative ${s.priceTag} font-black italic tracking-[0.3em] uppercase px-5 py-3 
                                  -rotate-3 skew-x-[15deg] origin-top shadow-2xl border border-black`}>
                    <span className="inline-block skew-x-[-15deg] text-lg">
                      ${Number(product.precio).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>

                {/* Card Container */}
                <div className={`relative overflow-hidden bg-gradient-to-b ${s.card} border-b-8 ${s.border} group-hover:border-black transition-all duration-500 shadow-2xl`}>
                  <div className="relative h-[450px] w-full overflow-hidden">
                    <div className={`absolute inset-0 ${frecuencia === 'normal' ? 'bg-black/5' : 'bg-black/40'} group-hover:bg-transparent transition-colors z-10`} />
                    {product.imagen ? (
                      <Image
                        src={product.imagen}
                        alt={product.nombre}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 font-black italic text-4xl">NO PIC</div>
                    )}

                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <div className={`${s.accentBg} ${frecuencia === 'anime' ? 'text-black' : 'text-white'} py-4 text-center font-black uppercase italic tracking-tighter border-2 border-transparent group-hover:border-white`}>
                        VER DETALLE DEL FLOW
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 space-y-2 relative z-20 ${frecuencia === 'normal' ? 'bg-white' : 'bg-black/80 backdrop-blur-sm'}`}>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none transition-colors">
                      {product.nombre}
                    </h2>
                    <p className={`${frecuencia === 'normal' ? 'text-zinc-400' : 'text-gray-500'} text-xs font-bold uppercase tracking-widest leading-tight line-clamp-2`}>
                      {product.descripcion}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </section>

        {/* CTA SECTION DINÁMICO */}
        <section className={`mt-40 mb-20 ${s.accentBg} p-12 md:p-24 relative overflow-hidden group border-4 border-black text-center lg:text-left shadow-2xl transition-colors duration-700`}>
           <div className={`absolute inset-0 opacity-10 pointer-events-none ${s.textura}`} />
           
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div>
                <h2 className={`text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] ${frecuencia === 'normal' || frecuencia === 'anime' ? 'text-black' : 'text-black'}`}>
                  ¿TIENES EL <br /> <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">DISEÑO?</span>
                </h2>
                <p className="mt-6 text-black font-black uppercase tracking-widest text-sm bg-white/20 inline-block px-2">
                  Nosotros ponemos la calidad, tú pones el mensaje.
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${frecuencia === 'normal' ? 'bg-white text-black' : 'bg-black text-white'} px-16 py-8 font-black uppercase text-2xl tracking-tighter shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all border-2 border-transparent`}
              >
                CUSTOMIZA AQUÍ
              </motion.button>
           </div>
        </section>

        <footer className={`text-center py-10 border-t ${frecuencia === 'normal' ? 'border-black/5' : 'border-white/5'}`}>
            <p className={`${frecuencia === 'normal' ? 'text-black/20' : 'text-white/20'} text-[10px] font-black uppercase tracking-[0.5em]`}>
              Jimmweb Streetwear // Concepción - Biobío // Chile 
            </p>
        </footer>
      </div>
    </main>
  )
}