import { supabase } from "@/lib/supabase"
import Marquee from "@/components/Marquee"
import Image from "next/image"
import ProductActions from "@/components/ProductActions"
import ThemeWrapper from "@/components/ThemeWrapper" // Necesitaremos este pequeño componente

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria?: string;
  descripcion?: string;
  stock: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params;

  const { data: productoRaw } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  const producto = productoRaw as Producto;

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white italic font-black uppercase tracking-[0.5em]">
        [ Drop no encontrado ]
      </div>
    );
  }

  // Nota: He movido la lógica de colores a un "ThemeWrapper" que crearemos 
  // para que el detalle del producto reaccione al cambio de la Navbar.
  
  return (
    <ThemeWrapper producto={producto}>
      {/* Todo el contenido visual se renderiza dentro del Wrapper para tener acceso a la 'frecuencia' */}
      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* SECCIÓN IZQUIERDA: VISUAL TÉCNICO */}
          <div className="relative aspect-square bg-[#0a0a0a] border border-white/5 overflow-hidden group rounded-3xl shadow-2xl">
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                backgroundSize: '30px 30px' 
              }} 
            />
            
            {producto.imagen && (
              <Image 
                src={producto.imagen} 
                alt={producto.nombre} 
                fill 
                priority
                className="object-contain p-12 group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
            )}
            
            <div className="badge-frecuencia absolute top-6 left-6 text-white text-[10px] font-black uppercase px-3 py-1.5 -rotate-2 shadow-xl z-10 transition-colors duration-500">
              Limited Drop • JIMMWEB
            </div>
          </div>

          {/* SECCIÓN DERECHA: INFO */}
          <div className="flex flex-col lg:pl-6">
            <nav className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4 transition-colors">
              {producto.categoria || 'Urban Collection'} / Archive 2026
            </nav>

            <h1 className="product-title text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] mb-8 transition-colors">
              {(producto.nombre || '').split(' ').map((word: string, i: number) => (
                <span key={i} className={i % 2 !== 0 ? "text-accent" : "text-main"}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <div className="bg-card-glass backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] space-y-8 shadow-2xl transition-all duration-500">
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-accent">
                    {producto.stock > 0 ? `${producto.stock} UNIDADES` : "AGOTADO"}
                  </span>
                </div>
                
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 italic">
                  SKU: JW-{producto.id.slice(0, 8)}
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black italic tracking-tighter text-main">
                  ${Number(producto.precio).toLocaleString('es-CL')}
                </span>
                <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                  + Envío a todo Chile
                </span>
              </div>

              <p className="text-description leading-relaxed font-medium text-sm md:text-base border-l-2 border-accent pl-6 italic transition-all">
                {producto.descripcion || "Diseño conceptual con acabados de alta resistencia. Materiales premium seleccionados para durabilidad extrema en la calle."}
              </p>

              <div className="pt-4">
                <ProductActions product={producto} />
              </div>

              {/* BADGES */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/5">
                <div className="text-center">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-tighter">Pago Seguro</p>
                  <p className="text-[9px] font-black text-main uppercase italic">Webpay+</p>
                </div>
                <div className="text-center border-x border-white/5">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-tighter">Despacho</p>
                  <p className="text-[9px] font-black text-accent uppercase italic transition-colors">A Regiones</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-tighter">Calidad</p>
                  <p className="text-[9px] font-black text-main uppercase italic">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Marquee />
      </div>
    </ThemeWrapper>
  );
}