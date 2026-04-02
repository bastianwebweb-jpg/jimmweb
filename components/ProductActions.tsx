"use client"

import { useState } from "react"
import { useCart } from "@/store/cart"
import { motion } from "framer-motion"

export default function ProductActions({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const addItem = useCart((state) => state.addItem)

  const sizes = ["S", "M", "L", "XL"]

  const handleAdd = () => {
    if (!selectedSize) {
      // Un pequeño feedback visual si no hay talla
      alert("DEBES SELECCIONAR UNA TALLA")
      return
    }

    addItem({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      talla: selectedSize,
      cantidad: 1,
    })
  }

  return (
    <div className="space-y-8">
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
          {selectedSize ? "Añadir al Arsenal" : "Selecciona Talla"}
        </span>
      </motion.button>

      {/* Info Extra Estilo Streetwear */}
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