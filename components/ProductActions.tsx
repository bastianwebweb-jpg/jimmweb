"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isCustomizing, setIsCustomizing] = useState(false)
  
  // Configuración para el DTF de 30x100cm
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

    // Preparamos el objeto JSON para la columna 'personalizacion' de Supabase
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
    <div className="space-y-8 relative z-50">
      {/* BANNER INTERACTIVO: Este es el que antes no hacía nada */}
      <button 
        onClick={() => setIsCustomizing(!isCustomizing)}
        className="w-full relative overflow-hidden group transition-all duration-500 border-4 border-black"
      >
        <div className={`flex flex-col items-center justify-between p-6 transition-colors duration-500 ${isCustomizing ? 'bg-white text-black' : 'bg-red-600 text-white'}`}>
          <div className="text-center w-full">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              {isCustomizing ? "EDITOR ACTIVO" : "¿TIENES EL DISEÑO?"}
            </h2>
            <p className="text-[10px] font-bold uppercase mt-2 tracking-[0.2em]">
              {isCustomizing ? "[ AJUSTANDO MEDIDAS TÉCNICAS ]" : "TÚ PONES EL MENSAJE, NOSOTROS LA CALIDAD"}
            </p>
          </div>
          <div className={`mt-4 border-2 px-6 py-2 font-black uppercase text-xs tracking-[0.3em] ${isCustomizing ? 'border-black bg-black text-white' : 'border-white bg-transparent'}`}>
            {isCustomizing ? "Cerrar Editor [X]" : "Customiza Aquí"}
          </div>
        </div>
      </button>

      {/* PANEL TÉCNICO DESPLEGABLE */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-zinc-900/80 border border-white/10 p-8 rounded-3xl space-y-6 backdrop-blur-md"
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-red-500 uppercase tracking-widest">Ancho (Máx 30cm)</label>
                <input 
                  type="number" max="30"
                  value={customConfig.ancho}
                  onChange={(e) => setCustomConfig({...customConfig, ancho: Number(e.target.value)})}
                  className="w-full bg-black border-2 border-white/5 p-4 text-2xl font-black italic text-white outline-none focus:border-red-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-red-500 uppercase tracking-widest">Alto (Máx 100cm)</label>
                <input 
                  type="number" max="100"
                  value={customConfig.alto}
                  onChange={(e) => setCustomConfig({...customConfig, alto: Number(e.target.value)})}
                  className="w-full bg-black border-2 border-white/5 p-4 text-2xl font-black italic text-white outline-none focus:border-red-600"
                />
              </div>
            </div>
            <p className="text-[9px] text-zinc-500 font-bold uppercase italic">* Área de impresión optimizada para film DTF premium.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SELECTOR DE TALLA */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 italic">Selecciona tu Blindaje</h3>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-16 h-16 border-2 font-black text-xl transition-all duration-300 ${
                selectedSize === size
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-110"
                  : "bg-transparent text-white border-white/10 hover:border-white/40"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* BOTÓN DE COMPRA */}
      <motion.button
        whileHover={selectedSize ? { scale: 1.02, rotate: -1 } : {}}
        whileTap={selectedSize ? { scale: 0.98 } : {}}
        onClick={handleAdd}
        className={`w-full py-8 font-black uppercase italic text-3xl tracking-tighter transition-all duration-500
          ${selectedSize 
            ? "bg-white text-black shadow-[12px_12px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2" 
            : "bg-zinc-900 text-zinc-700 cursor-not-allowed opacity-50"
          }`}
      >
        {selectedSize ? (isCustomizing ? "Soltar al Arsenal Custom" : "Añadir al Arsenal") : "Selecciona Talla"}
      </motion.button>
    </div>
  )
}