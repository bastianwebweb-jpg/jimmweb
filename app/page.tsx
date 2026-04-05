"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { useTheme } from "@/store/theme"

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria?: string; // Asegúrate de que este nombre coincida con tu tabla
  tipo?: string;
  description?: string;
  stock?: number;
}

export default function Home() {
  const { frecuencia } = useTheme()
  const [productos, setProductos] = useState<Producto[]>([]);
  const [errorVisible, setErrorVisible] = useState<string | null>(null);

  const skins = {
    rap: {
      bg: "bg-[#0a0a0a]",
      text: "text-white",
      accent: "text-red-500",
      accentBg: "bg-red-600",
      accentShadow: "shadow-[0_0_20px_rgba(220,38,38,0.4)]",
      glow: "bg-red-500/20",
      marquee: "bg-red-600 border-red-800",
      card: "bg-zinc-900/50 border-white/5",
      textura: "opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"
    },
    anime: {
      bg: "bg-[#0a0015]",
      text: "text-cyan-50",
      accent: "text-cyan-400",
      accentBg: "bg-cyan-500",
      accentShadow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
      glow: "bg-cyan-500/20",
      marquee: "bg-cyan-500 border-cyan-700",
      card: "bg-[#1a0033]/50 border-cyan-500/20",
      textura: "opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
    },
    normal: {
      bg: "bg-[#f8f8f8]",
      text: "text-black",
      accent: "text-zinc-900",
      accentBg: "bg-black",
      accentShadow: "shadow-none",
      glow: "bg-zinc-200/50",
      marquee: "bg-zinc-100 border-zinc-200",
      card: "bg-white border-zinc-200 shadow-sm",
      textura: "opacity-0"
    }
  }

  const s = skins[frecuencia] || skins.rap

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // CORRECCIÓN 1: Eliminamos el .limit(10) para ver todo el Arsenal
        const { data, error } = await supabase.from('productos').select('*'); 
        if (error) throw error;
        if (data) setProductos(data as Producto[]);
      } catch (err: any) {
        setErrorVisible("No se pudieron cargar los productos.");
      }
    };
    fetchProductos();
  }, []);

  return (
    <main className={`relative min-h-screen ${s.bg} ${s.text} transition-colors duration-700 overflow-hidden flex flex-col gap-20 md:gap-32`}>

      {/* --- FONDO DINÁMICO --- */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 ${frecuencia === 'normal' ? 'bg-white' : 'bg-gradient-to-br from-black via-[#0f0f0f] to-[#1f1f1f]'}`} />
        <div className={`absolute top-0 left-1/2 w-[800px] h-[800px] ${s.glow} blur-[150px] -translate-x-1/2 transition-colors duration-1000`} />
        <div className={`absolute inset-0 pointer-events-none ${s.textura} transition-opacity duration-700`} />
      </div>

      {/* --- SECCIÓN 1: HERO --- */}
      <section className="relative z-10 max-w-8xl w-full mx-auto px-6 pt-32 pb-10 md:pt-48 md:pb-16 grid md:grid-cols-2 items-center gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="space-y-2">
            <motion.span className={`${s.accent} font-black uppercase tracking-[0.3em] text-xs md:text-sm block`}>
              {frecuencia === 'anime' ? 'Neo-Cyber Collection 2026' : 'Streetwear Collection 2026'}
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter uppercase italic">
              Viste lo que <br />
              <span className="relative inline-block mt-2">
                <span className={`${s.text} relative z-10 not-italic`}>te representa</span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className={`absolute bottom-1 left-0 h-[30%] md:h-[40%] ${s.accentBg} -z-10 -rotate-1`}
                />
              </span>
            </h1>
          </div>

          <p className={`${frecuencia === 'normal' ? 'text-zinc-500' : 'text-gray-400'} text-lg md:text-2xl max-w-lg leading-tight font-medium border-l-2 ${s.accent === 'text-red-500' ? 'border-red-500/50' : 'border-cyan-500/50'} pl-4 md:pl-6 text-left`}>
            Diseños exclusivos inspirados en <span className={s.text}>Rap</span>, 
            <span className={s.text}> Anime</span> y la esencia de la <span className={s.text}>Cultura Urbana</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-4 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`${s.accentBg} ${frecuencia === 'anime' ? 'text-black' : 'text-white'} px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm ${s.accentShadow}`}
            >
              Explorar Arsenal
            </motion.button>
            <motion.button
              className={`border-2 ${frecuencia === 'normal' ? 'border-black' : 'border-white/10'} ${s.text} px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm backdrop-blur-sm`}
            >
              Personalizar
            </motion.button>
          </div>
        </motion.div>

        <div className="relative flex justify-center items-center mt-10 md:mt-0 w-full h-full">
          <motion.div className="relative">
            <motion.div
              className={`absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] ${s.glow} blur-[120px] rounded-full z-0`}
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.img
              src="/tu-foto.png" 
              className="relative z-10 w-[300px] md:w-[500px] object-contain drop-shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              onError={(e) => e.currentTarget.src = "https://via.placeholder.com/600x600/111111/cc0000?text=JIMMWEB"}
            />
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN MARQUEE --- */}
      <div className={`w-full ${s.marquee} py-3 overflow-hidden flex border-y -rotate-1 relative z-20 shadow-xl transition-colors duration-700`}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className={`flex whitespace-nowrap ${frecuencia === 'rap' ? 'text-black' : (frecuencia === 'anime' ? 'text-black' : 'text-zinc-600')} font-black uppercase text-sm md:text-base tracking-[0.2em]`}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4 flex items-center gap-4">
              ENVÍOS A TODO CHILE <span>•</span> DISEÑOS EXCLUSIVOS <span>•</span> CALIDAD PREMIUM <span>•</span> CULTURA URBANA <span>•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- SECCIÓN CATEGORÍAS (CARDS CORREGIDAS) --- */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-8xl w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter">
              NUESTRAS <span className={s.accent}>DIVISIONES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {["Rap", "Anime", "Urban", "Disney", "Games"].map((cat) => {
              // CORRECCIÓN 2: Búsqueda robusta ignorando mayúsculas y minúsculas
              const pic = productos.find(
                (p) => p.categoria?.toLowerCase().trim() === cat.toLowerCase()
              );

              return (
                <motion.div
                  key={cat}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`${s.card} p-3 pb-6 rounded-[2rem] border transition-all duration-500 group cursor-pointer overflow-hidden`}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-zinc-900 mb-4">
                    <div className={`absolute inset-0 ${s.accentBg} opacity-0 group-hover:opacity-10 transition-opacity z-10`} />
                    
                    {pic?.imagen ? (
                      <img
                        src={pic.imagen}
                        alt={cat}
                        className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${
                          frecuencia === "normal" ? "" : "grayscale group-hover:grayscale-0"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 font-black italic text-[10px] p-4 text-center">
                        NO {cat.toUpperCase()} <br/> DROP DETECTADO
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                        <p className="text-[8px] font-black text-white tracking-widest uppercase">New Drop</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none group-hover:text-red-500 transition-colors">
                      {cat}
                    </h3>
                    <div className={`h-1 w-8 ${s.accentBg} mt-2 group-hover:w-full transition-all duration-500`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN LO MÁS VENDIDO --- */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-8xl mx-auto w-full"> 
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter">
              LO MÁS VENDIDO <span className={s.accent}>AHORA</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {productos.slice(0, 3).map((item) => (
                <motion.div
                  key={item.id}
                className={`group relative ${frecuencia === 'normal' ? 'bg-white' : 'bg-[#0a0a0a]'} rounded-[2rem] border ${frecuencia === 'normal' ? 'border-zinc-200' : 'border-white/5'} overflow-hidden flex flex-col w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)] max-w-[350px] shadow-2xl transition-all duration-500 hover:border-${s.accent === 'text-red-500' ? 'red-500/30' : 'cyan-500/30'}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`${s.accentBg} ${frecuencia === 'anime' ? 'text-black' : 'text-white'} text-[10px] font-black px-3 py-1 rounded-full italic uppercase`}>
                      🔥 TOP SALES
                    </span>
                  </div>
                  <img src={item.imagen} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>

                <div className={`p-6 flex flex-col flex-grow justify-between ${frecuencia === 'normal' ? 'bg-white' : 'bg-zinc-950/90'}`}>
                  <h4 className="font-black text-xl md:text-2xl uppercase tracking-tighter truncate group-hover:text-red-500 transition-colors">
                    {item.nombre}
                  </h4>
                  <div className="flex justify-between items-center mt-6">
                    <span className={`font-black text-2xl tracking-tighter ${s.text}`}>
                      ${Number(item.precio || 0).toLocaleString('es-CL')}
                    </span>
                    <motion.button className={`${s.accentBg} ${frecuencia === 'anime' ? 'text-black' : 'text-white'} text-[10px] font-black px-5 py-2 rounded-lg italic`}>
                      COMPRAR
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN MENSAJE FINAL --- */}
      <section className="relative w-full px-6 py-28">
        <motion.div className="relative max-w-8xl mx-auto flex flex-col items-center text-center z-10">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] ${s.glow} blur-[120px] -z-10`} />
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
            No es solo ropa, <br /> 
            es lo que <span className={`${s.accent} not-italic`}>eres</span>
          </h2>
          <motion.button className={`${s.accentBg} ${frecuencia === 'anime' ? 'text-black' : 'text-white'} px-12 py-5 rounded-2xl font-black uppercase text-xl tracking-widest`}>
            Crear mi diseño
          </motion.button>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`${frecuencia === 'normal' ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'} border-t pt-16 pb-8 px-6`}>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <h3 className={`text-3xl font-black italic tracking-tighter uppercase ${s.text}`}>
            JIMM<span className={s.accent.replace('text-', 'text-')}>WEB</span>
          </h3>
          <p className="text-zinc-500 text-[10px] font-black text-center uppercase tracking-widest pt-8">
            © {new Date().getFullYear()} JIMMWEB • Urban Soul & Street Culture
          </p>
        </div>
      </footer>
    </main>
  )
}