"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function ProductsClient({ products }: any) {

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-3xl font-black uppercase italic animate-pulse tracking-tighter">
          BUSCANDO EL <span className="text-red-500 text-4xl">ARSENAL...</span>
        </p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
      
      {/* --- NUEVAS TEXTURAS Y FONDOS URBANOS --- */}
      
      {/* 1. Capa de Concreto/Asfalto (Sutil) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] z-0" />
      
      {/* 2. Capa de Ruido Cinematográfico (Para evitar bandas en el degradado) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />

      {/* 3. El Resplandor Rojo (Lo bajamos a -z-20 para que las texturas queden encima) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-red-600/10 blur-[160px] -z-20" />
      
      {/* 4. Viñeta lateral para profundidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40 pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 py-20 md:py-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block"
          >
            {/* Texto de fondo con opacidad extra baja */}
            <span className="absolute -top-12 -left-8 text-red-500/[0.03] text-[12rem] font-black italic select-none leading-none">STREET</span>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter relative">
              DROP <br />
              <span className="text-red-500 not-italic drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">EXCLUSIVE</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 border-l-4 border-red-500 pl-6"
          >
            <p className="text-gray-400 text-2xl md:text-3xl font-black uppercase tracking-tighter">
              No seguimos tendencias. <span className="text-white">Las quemamos.</span>
            </p>
            <p className="mt-2 text-sm font-medium tracking-[0.3em] text-red-500/60 uppercase">
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
                {/* PRECIO TAG (Se mantiene tu diseño original que es muy bueno) */}
                <div className="absolute top-0 right-10 z-30 pointer-events-none group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="relative bg-red-600 text-white font-black italic tracking-[0.3em] uppercase px-5 py-3 
                                  -rotate-3 skew-x-[15deg] origin-top shadow-[-5px_10px_30px_-5px_rgba(0,0,0,0.8)] 
                                  border border-black bg-[url('https://www.transparenttextures.com/patterns/dark-dot-2.png')] bg-repeat">
                    <span className="inline-block skew-x-[-15deg] text-lg">
                      ${Number(product.precio).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>

                {/* Card Container con degradado interno más profundo */}
                <div className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#050505] border-b-8 border-red-600 group-hover:border-white transition-all duration-500 shadow-2xl">
                  <div className="relative h-[450px] w-full overflow-hidden">
                    {/* Overlay de la imagen más oscuro por defecto */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10" />
                    {product.imagen ? (
                      <Image
                        src={product.imagen}
                        alt={product.nombre}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10 font-black italic text-4xl">NO PIC</div>
                    )}

                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <div className="bg-red-500 text-white py-4 text-center font-black uppercase italic tracking-tighter group-hover:bg-white group-hover:text-black transition-colors border-2 border-transparent group-hover:border-black">
                        VER DETALLE DEL FLOW
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2 relative z-20 bg-black/80 backdrop-blur-sm">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none group-hover:text-red-500 transition-colors">
                      {product.nombre}
                    </h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-tight line-clamp-2">
                      {product.descripcion}
                    </p>
                    <div className="pt-4 flex items-center gap-4">
                        <div className="h-[1px] flex-grow bg-white/5" />
                        <span className="flex-shrink-0 text-white/20 group-hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </section>

        {/* CTA SECTION - Mejoramos el contraste del texto negro sobre rojo */}
        <section className="mt-40 mb-20 bg-red-600 p-12 md:p-24 relative overflow-hidden group border-4 border-black text-center lg:text-left shadow-[0_0_50px_rgba(239,68,68,0.2)]">
           {/* Textura interna del banner CTA */}
           <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
           
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div>
                <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] text-black">
                  ¿TIENES EL <br /> <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">DISEÑO?</span>
                </h2>
                <p className="mt-6 text-black font-black uppercase tracking-widest text-sm bg-white/20 inline-block px-2">
                  Nosotros ponemos la calidad, tú pones el mensaje.
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-16 py-8 font-black uppercase text-2xl tracking-tighter shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                CUSTOMIZA AQUÍ
              </motion.button>
           </div>
        </section>

        <footer className="text-center py-10 border-t border-white/5">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
                Jimmweb Streetwear // Concepción - Biobío // Chile 
            </p>
        </footer>
      </div>
    </main>
  )
}