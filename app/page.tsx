"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

// 1. Definimos la estructura del producto para que TypeScript no reclame
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria?: string;
  description?: string;
  stock?: number;
}

export default function Home() {
  // 2. Le decimos al estado que usará la lista de nuestra Interface
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .limit(8);
      
      if (error) {
        console.error("Error cargando productos:", error);
        return;
      }

      if (data) {
        // Cast de datos para asegurar que coincidan con la interfaz
        setProductos(data as Producto[]);
      }
    };
    fetchProductos();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col gap-20 md:gap-32">

      {/* --- FONDO --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f0f0f] to-[#1f1f1f]" />
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-red-500/20 blur-[150px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/3 w-[700px] h-[700px] bg-purple-500/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]" />
      </div>

      {/* --- SECCIÓN 1: HERO --- */}
      <section className="relative z-10 max-w-8xl w-full mx-auto px-6 pt-32 pb-10 md:pt-48 md:pb-16 grid md:grid-cols-2 items-center gap-10 md:gap-16">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 space-y-8 text-center md:text-left flex flex-col items-center md:items-start md:max-w-2xl mx-auto md:mx-0"
        >
          <div className="space-y-2">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 font-black uppercase tracking-[0.3em] text-xs md:text-sm block ml-1"
            >
              Streetwear Collection 2026
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter uppercase italic">
              Viste lo que <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-white not-italic">te representa</span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-[30%] md:h-[40%] bg-red-600 -z-10 -rotate-1"
                />
              </span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg md:text-2xl max-w-lg leading-tight font-medium border-l-2 border-red-500/50 pl-4 md:pl-6 text-left">
            Diseños exclusivos inspirados en <span className="text-white">Rap</span>, 
            <span className="text-white"> Anime</span> y la esencia de la <span className="text-white">Cultura Urbana</span>.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start pt-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ff0000" }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
            >
              Explorar Arsenal
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/10 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm backdrop-blur-sm transition-all"
            >
              Personalizar
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative flex justify-center items-center mt-10 md:mt-0 w-full h-full">
          <motion.div className="relative flex justify-center items-center">
            <motion.div
              className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] bg-red-500/30 blur-[120px] rounded-full z-0"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src="/tu-foto.png" 
              alt="Polera Principal"
              className="relative z-10 w-[300px] md:w-[500px] lg:w-[600px] object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.7)]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN MARQUEE --- */}
      <div className="w-full bg-red-600 py-3 overflow-hidden flex border-y border-red-800 -rotate-1 relative z-20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap text-black font-black uppercase text-sm md:text-base tracking-[0.2em]"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4 flex items-center gap-4">
              ENVÍOS A TODO CHILE <span className="text-white/50">•</span> 
              DISEÑOS EXCLUSIVOS <span className="text-white/50">•</span> 
              CALIDAD PREMIUM <span className="text-white/50">•</span> 
              CULTURA URBANA <span className="text-white/50">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- SECCIÓN 2: CATEGORÍAS (DINÁMICAS) --- */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-8xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter">
              Diseños que marcan <span className="text-red-500">estilo</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productos.slice(0, 3).map((prod, index) => (
              <motion.div 
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                   <div className="absolute inset-0 bg-red-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <img 
                    src={prod.imagen || "/tu-foto.png"} 
                    alt={prod.nombre} 
                    className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                  />
                </div>
                <h3 className="text-2xl font-black uppercase italic italic">{prod.categoria || 'Colección'}</h3>
                <p className="text-gray-400 text-sm mt-2">Inspiración urbana de alta gama.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* --- SECCIÓN 3: LO MÁS VENDIDO (Ajustada y Centralizada 8xl) --- */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-8xl mx-auto w-full"> 
          {/* Título de la sección */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter">
                LO MÁS VENDIDO <span className="text-red-500">AHORA</span>
              </h2>
              <p className="text-zinc-500 text-sm md:text-base font-bold uppercase tracking-[0.3em] mt-4">
                Lo que está marcando tendencia en la calle
              </p>
            </motion.div>
          </div>

          {/* Grid centralizado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
            {productos.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col h-full w-full max-w-[340px] shadow-2xl transition-all duration-500 hover:border-red-500/30"
              >
                {/* 1. Contenedor de Imagen Cuadrado Perfecto (1:1) o 4:5 */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                  {/* Badge superior con estilo sticker */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full italic uppercase shadow-lg shadow-red-900/40">
                      🔥 TOP SALES
                    </span>
                  </div>
                  
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradiente inferior para lectura de texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* 2. Información del Producto */}
                <div className="p-7 flex flex-col flex-grow justify-between bg-zinc-950/80 backdrop-blur-md">
                  <div className="space-y-1">
                    <h4 className="font-black text-2xl uppercase tracking-tighter leading-none truncate group-hover:text-red-500 transition-colors">
                      {item.nombre}
                    </h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">
                      Edición Limitada • Urban Soul
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <span className="text-white font-black text-2xl tracking-tighter">
                        ${Number(item.precio).toLocaleString('es-CL')}
                      </span>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-300 text-[11px] font-black px-6 py-3 rounded-xl uppercase italic shadow-xl"
                    >
                      Comprar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: EL MENSAJE --- */}
      <section className="relative w-full px-6 py-28">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-8xl mx-auto flex flex-col items-center text-center z-10"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-red-500/5 blur-[120px] -z-10" />
          
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
            No es solo ropa, <br className="hidden md:block" /> 
            es lo que <span className="text-red-500 not-italic">eres</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mb-12 italic">
            "Cada diseño representa una historia, una vibra, una forma de expresarte."
          </p>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: -1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-xl tracking-widest shadow-2xl shadow-red-500/40"
          >
            Crear mi diseño
          </motion.button>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8 px-6">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">
              JIMM<span className="text-red-500">WEB</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0 font-medium">
              Ropa con actitud. Diseños inspirados en la escena urbana, hechos para destacar.
            </p>
          </div>

          <div className="flex flex-col space-y-3 text-gray-400 text-sm font-bold uppercase tracking-widest items-center md:items-start pt-2">
            <a href="#" className="hover:text-red-500 transition">Catálogo</a>
            <a href="#" className="hover:text-red-500 transition">Personalizar</a>
            <a href="#" className="hover:text-red-500 transition">Envíos</a>
          </div>

          <div className="flex flex-col space-y-3 text-gray-400 text-sm font-bold uppercase tracking-widest items-center md:items-end pt-2">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">TikTok</a>
            <p className="text-[10px] text-zinc-600 pt-4">Concepción, Chile</p>
          </div>
        </div>

        <div className="mt-16 text-zinc-700 text-[10px] font-black text-center uppercase tracking-widest border-t border-white/5 pt-8">
          © {new Date().getFullYear()} JIMMWEB • Urban Soul & Street Culture
        </div>
      </footer>

    </main>
  )
}