"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  
  // 1. ESTADO PARA MOSTRAR/OCULTAR EL EDITOR
  const [isCustomizing, setIsCustomizing] = useState(false)
  
  // 2. ESTADO PARA LOS DATOS TÉCNICOS
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
      {/* --- BOTÓN QUE ACTIVA LA MAGIA --- */}
      <button 
        type="button"
        onClick={() => setIsCustomizing(!isCustomizing)}
        className={`w-full p-4 border-2 transition-all flex justify-between items-center group relative overflow-hidden italic font-black uppercase text-[11px] tracking-widest z-10
          ${isCustomizing 
            ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
            : "bg-black border-white/5 text-zinc-500 hover:border-red-600/50"}`}
      >
        <span>{isCustomizing ? "[ CERRAR EDITOR ]" : "¿TIENES EL DISEÑO?"}</span>
        {!isCustomizing && <span className="text-red-600 group-hover:text-white transition-colors">CUSTOMIZA AQUÍ</span>}
      </button>

      {/* --- PANEL QUE APARECE AL HACER CLIC --- */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="overflow-hidden border-l-4 border-red-600 bg-zinc-900/30 p-6 space-y-6 rounded-r-2xl backdrop-blur-sm"
          >
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                Configuración del Arsenal (DTF)
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-zinc-500">Ancho (Máx 30cm)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      max="30"
                      value={customConfig.ancho}
                      onChange={(e) => setCustomConfig({...customConfig, ancho: Number(e.target.value)})}
                      className="w-full bg-black border border-white/10 p-3 text-sm font-bold text-red-500 outline-none focus:border-red-600 transition-colors"
                    />
                    <span className="absolute right-3 top-3 text-[10px] text-zinc-700 font-black">CM</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-zinc-500">Alto (Máx 100cm)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      max="100"
                      value={customConfig.alto}
                      onChange={(e) => setCustomConfig({...customConfig, alto: Number(e.target.value)})}
                      className="w-full bg-black border border-white/10 p-3 text-sm font-bold text-red-500 outline-none focus:border-red-600 transition-colors"
                    />
                    <span className="absolute right-3 top-3 text-[10px] text-zinc-700 font-black">CM</span>
                  </div>
                </div>
              </div>

              {/* Botón de subida de archivo (Simulado por ahora) */}
              <div className="border-2 border-dashed border-white/5 p-4 text-center group hover:border-red-600/40 transition-colors cursor-pointer">
                 <p className="text-[9px] font-black uppercase text-zinc-500 group-hover:text-white">Subir Archivo .PNG</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SELECTOR DE TALLAS (Se mantiene abajo) --- */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          TALLA / SIZE
        </h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
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

      {/* --- BOTÓN DE COMPRA FINAL --- */}
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
    </div>
  )
}