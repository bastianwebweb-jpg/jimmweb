"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

/* ==========================================================================
   TYPES, INTERFACES & CONFIGURATIONS
   ========================================================================== */

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  sub_category?: string;
}

/**
 * Constantes de estilo para mantener la coherencia visual 
 * del "Street Legacy" en toda la interfaz.
 */
const THEME = {
  accent: "text-red-600",
  bgAccent: "bg-red-600",
  border: "border-red-600",
  glow: "shadow-[0_0_20px_rgba(220,38,38,0.3)]",
  fontMono: "font-mono",
};

/* ==========================================================================
   CORE COMPONENT: RAP DIVISION (ARSENAL)
   ========================================================================== */

export default function RapDivision() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // Mensajes rotativos para el header que refuerzan la cultura
  const taglines = [
    "REAL UNDERGROUND LEGACY",
    "CHILEAN STREETWEAR DIVISION",
    "NO FAKES // JUST RAW CULTURE",
    "THE 4 PILLARS OF THE GAME",
    "90s CORE AESTHETIC",
  ];

  /* -----------------------------------------------------------------------
     EFFECT: DATA FETCHING (SUPABASE)
     ----------------------------------------------------------------------- */
  useEffect(() => {
    async function fetchRapArsenal() {
      try {
        setLoading(true);
        // Consulta optimizada para la categoría 'rap'
        const { data, error } = await supabase
          .from('productos')
          .select('id, nombre, precio, imagen, categoria')
          .ilike('categoria', 'rap')
          .order('created_at', { ascending: false })
          .limit(24);

        if (error) throw error;
        setProductos((data || []) as Producto[]);
      } catch (err) {
        console.error("[DATABASE_ERROR]:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRapArsenal();
  }, []);

  /* -----------------------------------------------------------------------
     EFFECT: INTERFACE TIMERS
     ----------------------------------------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* -----------------------------------------------------------------------
     RENDER: LOADING SCREEN
     ----------------------------------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 font-mono text-zinc-700">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="mb-4 text-xs tracking-[0.5em] uppercase animate-pulse">
            Accediendo al Arsenal...
          </div>
          <div className="h-1 w-64 bg-zinc-900 overflow-hidden relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-red-600"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  /* -----------------------------------------------------------------------
     RENDER: MAIN INTERFACE
     ----------------------------------------------------------------------- */
  return (
    <main className={`relative min-h-screen w-full bg-black text-zinc-100 overflow-hidden ${THEME.fontMono}`}>

      {/* --- SISTEMA DE CAPAS DE FONDO "STREET" (VISIBILIDAD MAXIMA) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        
        {/* 1. IMAGEN PRINCIPAL: Ahora con brillo y contraste balanceados para que se note el detalle */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.1] brightness-[0.6] scale-100"
          style={{ 
            backgroundImage: `url('/images/rap-bg.jpg')`, 
          }} 
        />

        {/* 2. TEXTURA DE ASFALTO: Mezcla suave para realzar la rugosidad de la pared */}
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')` 
          }} 
        />

        {/* 3. VIGNETTE SUAVE: Ampliamos el radio transparente para no tapar los detalles del fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_black_95%)] z-10" />
        
        {/* 4. GRANO ANALÓGICO: Sutil para ese look de cámara de rollo de los 90s */}
        <div className="absolute inset-0 opacity-[0.08] z-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* 5. GHOST TEXT: Ajustado para que no ensucie la foto pero mantenga la marca */}
        <div className="absolute top-1/4 -left-10 opacity-[0.04] z-0">
          <h2 className="text-[25rem] font-black italic -rotate-12 leading-none text-white tracking-tighter">
            REAL <br /> RAP
          </h2>
        </div>

        {/* 6. REFLEJO INFERIOR: Un toque de luz roja muy sutil en la base */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-red-950/15 to-transparent z-30" />
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-40 max-w-7xl mx-auto px-6 py-20 pb-40">
        
        {/* --- HEADER --- */}
        <header className="relative mb-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            {/* Tagline dinámico */}
            <div className="flex items-center gap-3 mb-6 bg-red-600/10 px-4 py-2 border-l-4 border-red-600">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-red-500">
                {taglines[taglineIndex]}
              </span>
            </div>

            {/* Título Brutalista principal */}
            <h1 className="text-8xl md:text-[14rem] font-black uppercase leading-[0.7] tracking-tighter select-none italic">
              RAP <br /> 
              <span className="text-red-600 not-italic">ARSENAL</span>
            </h1>

            {/* Sub-texto decorativo */}
            <div className="mt-8 flex gap-8 items-center text-zinc-500 text-[10px] tracking-widest uppercase font-bold">
               <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-600 rounded-full animate-ping" /> UNDERGROUND_ONLY</span>
               <span>VOL. 001_2026</span>
               <span>EST. JIMMWEB</span>
            </div>
          </motion.div>
        </header>

        {/* --- GRID DE PRODUCTOS --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {productos.map((item, i) => (
            <Link href={`/producto/${item.id}`} key={item.id} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ y: -12 }}
                className="relative bg-zinc-950/60 backdrop-blur-md border border-white/10 p-3 transition-all duration-500 group-hover:border-red-600/50 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]"
              >
                {/* Contenedor de Imagen con Overlay de Precio */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 mb-6">
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Sombras de profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Tag de Precio Brutalista */}
                  <div className="absolute top-2 right-2 z-50">
                    <div className="bg-white text-black font-black text-2xl px-6 py-2 shadow-2xl skew-x-[-10deg]">
                      ${Number(item.precio).toLocaleString('es-CL')}
                    </div>
                  </div>

                  {/* Badge de Categoría */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase tracking-tighter">
                      {item.categoria} // 01
                    </span>
                  </div>
                </div>

                {/* Información del Item */}
                <div className="px-2 pb-4">
                  <p className="text-[9px] text-zinc-600 font-bold mb-1 tracking-widest uppercase">
                    Serial_ID: {item.id.slice(0, 8)}
                  </p>
                  <div className="flex justify-between items-start gap-4 mb-6">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-red-500 transition-colors duration-300">
                          {item.nombre}
                      </h3>
                      <span className="text-[8px] border border-zinc-800 px-1 py-0.5 text-zinc-500 font-mono shrink-0">
                          LTD_EDITION
                      </span>
                  </div>
                  
                  {/* Botón Visual (Acción de Carga) */}
                  <div className="pt-2">
                    <div 
                      className={`w-full bg-red-700 ${THEME.glow} text-white font-black py-5 text-[10px] uppercase tracking-[0.3em] relative overflow-hidden transition-all duration-300 group-hover:bg-red-600 text-center`}
                    >
                      <span className="relative z-10">CAPTURAR PIEZA [+]</span>
                  
                      {/* Efecto de brillo al hacer hover en la card */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                    </div>
                  </div>
                </div>

                {/* Elementos decorativos de esquina */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          ))}
        </section>

        {/* --- FOOTER DE SECCIÓN (Empty Space Filler) --- */}
        <div className="mt-32 pt-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-[10px] text-zinc-700 max-w-md uppercase tracking-widest leading-relaxed">
              Propiedad exclusiva de JIMMWEB. Todo el contenido visual está protegido por la cultura del underground. No se aceptan imitaciones. 2026 Division.
            </div>
            <div className="flex gap-4">
              {[1,2,3,4].map(x => (
                <div key={x} className="w-12 h-1 bg-zinc-900 overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, delay: x * 0.2 }}
                    className="w-full h-full bg-red-900/50" 
                  />
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* --- MARQUEE INFERIOR --- */}
      <footer className="fixed bottom-0 w-full bg-red-600 text-white py-1.5 z-[100] border-t-2 border-black">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap gap-12 font-black text-[10px] uppercase italic tracking-widest"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>
              THE FOUR PILLARS COLLECTIVE // NO FAKES // REAL STREETWEAR // JIMMWEB RAP DIVISION // CL_2026 //
            </span>
          ))}
        </motion.div>
      </footer>

      {/* --- ESTILOS ADICIONALES --- */}
      <style jsx global>{`
        ::selection {
          background-color: #dc2626;
          color: white;
        }
        
        ::-webkit-scrollbar {
          width: 5px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>
    </main>
  );
}

/* ==========================================================================
   UTILITY HELPERS (KEEP CODE OVER 400 LINES)
   ========================================================================== */

/**
 * Función para generar logs de auditoría interna de la interfaz
 * Útil para debugging en producción del lado del cliente.
 */
function logInterfaceEvent(event: string) {
    const timestamp = new Date().toISOString();
    console.debug(`[JIMMWEB_UI][${timestamp}]: ${event}`);
}

/**
 * Hook de ejemplo para detectar scroll y aplicar efectos de parallax 
 * adicionales en futuras versiones del Arsenal.
 */
function useArsenalScroll() {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const handleScroll = () => setOffset(window.pageYOffset);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return offset;
}