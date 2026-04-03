"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isCustomizing, setIsCustomizing] = useState(false)
  
  // Estado para los límites del DTF (30x100cm)
  const [customConfig, setCustomConfig] = useState({
    ancho: 28,
    alto: 45,
    posicion: { x: 0, y: 0 },
    url: ""
  })

  const addItem = useCart((state) => state.addItem)
  const sizes = ["S", "M", "L", "XL"]

  const handleAdd = () => {
    if (!selectedSize) {
      alert("DEBES SELECCIONAR UNA TALLA")
      return
    }

    // Si está customizando, preparamos el objeto para la columna JSONB de Supabase
    const itemExtra = isCustomizing ? {
      custom_config: {
        prenda: product.nombre,
        diseño_png: customConfig.url || product.imagen,
        ancho_impresion_cm: customConfig.ancho,
        alto_impresion_cm: customConfig.alto,
        posicion: customConfig.posicion
      }
    } : {}

    addItem({
      id: product.id,
      nombre: isCustomizing ? `${product.nombre} (CUSTOM)` : product.nombre,
      precio: product.precio,
      imagen: customConfig.url || product.imagen,
      talla: selectedSize,
      cantidad: 1,
      ...itemExtra
    })
  }

  return (
    <div className="space-y-8">
      {/* Botón de Personalización - Estilo Franja Roja */}
      <button 
        onClick={() => setIsCustomizing(!isCustomizing)}
        className={`w-full p-4 border-2 transition-all flex justify-between items-center group relative overflow-hidden italic font-black uppercase text-[11px] tracking-widest
          ${isCustomizing 
            ? "bg-red-600 border-red-600 text-white" 
            : "bg-black border-white/5 text-zinc-500 hover:border-red-600/50"}`}
      >
        <span>{isCustomizing ? "[ CERRAR EDITOR ]" : "¿TIENES EL DISEÑO?"}</span>
        {!isCustomizing && <span className="text-red-600 group-hover:text-white transition-colors">CUSTOMIZA AQUÍ</span>}
      </button>

      {/* Panel de Ajustes Técnicos (Aparece solo si activa custom) */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l-2 border-red-600 bg-zinc-900/20 p-6 space-y-4 rounded-r-xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-zinc-500">Ancho (Máx 30cm)</label>
                <input 
                  type="number" 
                  max="30"
                  value={customConfig.ancho}
                  onChange={(e) => setCustomConfig({...customConfig, ancho: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 p-2 text-xs font-bold text-red-500 outline-none focus:border-red-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-zinc-500">Alto (Máx 100cm)</label>
                <input 
                  type="number" 
                  max="100"
                  value={customConfig.alto}
                  onChange={(e) => setCustomConfig({...customConfig, alto: Number(e.target.value)})}
                  className="w-full bg-black border border-white/10 p-2 text-xs font-bold text-red-500 outline-none focus:border-red-600"
                />
              </div>
            </div>
            <p className="text-[8px] text-zinc-600 uppercase font-bold italic">
              * El sistema validará tu archivo PNG al subirlo al arsenal.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selector de Tallas */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          TALLA / SIZE
        </h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-14 h-14 border-2 font-black transition-all duration-300 ${
                selectedSize === size
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "bg-transparent text-white border-white/10 hover:border-white/40"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de Añadir */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAdd}
        className={`w-full py-6 font-black uppercase italic text-2xl tracking-tighter transition-all duration-500 relative overflow-hidden
          ${selectedSize 
            ? "bg-white text-black shadow-[10px_10px_0px_0px_rgba(239,68,68,1)]" 
            : "bg-zinc-900 text-zinc-600 cursor-not-allowed opacity-50"
          }`}
      >
        <span className="relative z-10">
          {selectedSize ? (isCustomizing ? "Soltar al Arsenal Custom" : "Añadir al Arsenal") : "Selecciona Talla"}
        </span>
      </motion.button>

      {/* Info Extra */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
        <div>
          <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">Especificación</p>
          <p className="text-[10px] font-bold uppercase italic">Heavy Weight Cotton</p>
        </div>
        <div>
          <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">Despacho</p>
          <p className="text-[10px] font-bold uppercase italic">Bio Bio / Nacional</p>
        </div>
      </div>
    </div>
  )
}