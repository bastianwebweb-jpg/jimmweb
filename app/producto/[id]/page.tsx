import { supabase } from "@/lib/supabase"
import Marquee from "@/components/Marquee"
import Image from "next/image"
import ProductActions from "@/components/ProductActions" // Importamos el nuevo componente

export default async function Producto({ params }: any) {
  // Resolvemos params para Next.js 15
  const { id } = await params;

  const { data: producto } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single()

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white italic font-black uppercase tracking-[0.5em]">
        [ Drop no encontrado ]
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* SECCIÓN IZQUIERDA: VISUAL TÉCNICO */}
          <div className="relative aspect-square bg-[#0a0a0a] border border-white/5 overflow-hidden group">
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                backgroundSize: '20px 20px' // Corregido: backgroundSize en camelCase
              }} 
            />
            
            {producto.imagen && (
              <Image 
                src={producto.imagen} 
                alt={producto.nombre} 
                fill 
                priority
                className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
              />
            )}
            
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 -rotate-2 shadow-xl">
              Limited Drop
            </div>
          </div>

          {/* SECCIÓN DERECHA: INFO Y COMPRA */}
          <div className="flex flex-col">
            <nav className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Categoría / {producto.categoria || 'Streetwear'}
            </nav>

            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-6">
              {producto.nombre.split(' ').map((word: string, i: number) => (
                <span key={i} className={i % 2 !== 0 ? "text-red-500" : "text-white"}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* STATUS DE STOCK Y SKU */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                  {producto.stock > 0 ? `${producto.stock} DISPONIBLES` : "SOLD OUT"}
                </span>
              </div>
              <span className="text-gray-800">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                SKU: JW-{producto.id.slice(0,5)}
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-black italic tracking-tighter text-white">
                ${producto.precio}
              </span>
              <span className="text-gray-600 text-xs font-bold uppercase tracking-widest border-l border-white/10 pl-4">
                IVA Incluido
              </span>
            </div>

            <div className="space-y-8 border-t border-white/10 pt-8">
              {/* FOMO: GENTE VIENDO */}
              <div className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span className="text-white">4 PERSONAS</span> VIENDO ESTE DROP AHORA
                  </p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed font-medium max-w-md">
                {producto.descripcion || "Diseño conceptual con acabados de alta resistencia. Materiales seleccionados para durabilidad extrema."}
              </p>

              {/* COMPONENTE DE ACCIÓN (TALLAS + ADD TO CART) */}
              <ProductActions product={producto} />

              {/* SUBTEXTO DE CONFIANZA */}
              <div className="mt-4 flex items-center justify-between px-2 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <span className="text-[8px] font-black uppercase tracking-widest text-white">Webpay Plus</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-red-500">Envío Seguro</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-white">Concepción, CL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE INFINITO */}
      <div className="mt-auto">
        <Marquee />
      </div>
    </div>
  )
}