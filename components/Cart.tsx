"use client"

import { useCart } from "@/store/cart"
import { createOrder } from "@/lib/createOrder"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Cart() {
  const { items, clearCart, removeItem, updateQuantity, isOpen, toggleCart } = useCart()

  // Cálculo del total considerando cantidades
  const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
  const metaEnvioGratis = 70000
  const faltaParaGratis = metaEnvioGratis - total

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[150] cursor-crosshair"
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[200] flex flex-col shadow-[[-20px_0px_50px_rgba(0,0,0,0.8)]]"
          >
            {/* 1. Header con progreso de envío */}
            <div className="p-8 border-b border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                    TU <span className="text-red-600">BOTÍN</span>
                  </h2>
                  <p className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mt-2">
                    {items.length} UNIDADES LISTAS
                  </p>
                </div>
                <button onClick={toggleCart} className="group p-2">
                  <span className="text-gray-500 group-hover:text-red-500 font-black transition-colors text-xl">[ X ]</span>
                </button>
              </div>

              {items.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className={faltaParaGratis <= 0 ? "text-green-500" : "text-gray-400"}>
                      {faltaParaGratis <= 0 ? "¡ENVÍO GRATIS ACTIVADO!" : `TE FALTAN $${faltaParaGratis} PARA ENVÍO GRATIS`}
                    </span>
                    <span className="text-gray-600">{Math.min(100, (total / metaEnvioGratis) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (total / metaEnvioGratis) * 100)}%` }}
                      className={`h-full ${faltaParaGratis <= 0 ? 'bg-green-500' : 'bg-red-600'}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Lista de productos con Selector +/- */}
            <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6">
                  <div className="text-center">
                    <p className="text-white/20 italic uppercase font-black text-2xl tracking-tighter leading-tight">
                      EL ARSENAL <br /> ESTÁ VACÍO
                    </p>
                  </div>
                  <button 
                    onClick={toggleCart}
                    className="border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    VOLVER AL DEPÓSITO
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.talla}`}
                    layout
                    className="flex gap-4 items-start"
                  >
                    <div className="relative h-24 w-20 bg-[#0f0f0f] border border-white/5 flex-shrink-0">
                      <Image src={item.imagen} alt={item.nombre} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-grow space-y-1">
                      <h4 className="text-xs font-black uppercase italic tracking-tighter">{item.nombre}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">Talla: {item.talla || 'Única'}</p>
                      <p className="text-sm font-black text-red-600 italic">${item.precio}</p>
                      
                      {/* SELECTOR DE CANTIDAD */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex border border-white/10 items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.talla, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white/5 font-black"
                          >-</button>
                          <span className="w-8 text-center text-[10px] font-black">{item.cantidad}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.talla, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white/5 font-black"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id, item.talla)}
                          className="text-[9px] font-black uppercase text-gray-600 hover:text-red-500 underline underline-offset-4"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* 3. Upselling Sutil (Solo si hay items) */}
              {items.length > 0 && (
                <div className="pt-10 border-t border-white/5">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4 italic">Completa el equipo</p>
                  <div className="bg-white/5 p-4 flex items-center justify-between border border-dashed border-white/10">
                     <span className="text-[10px] font-black uppercase italic">Sticker Pack "Conce Street"</span>
                     <button className="text-red-500 font-black text-[10px] hover:underline">+ AÑADIR ($3.000)</button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Footer con Total y Checkout */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-black space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-gray-600 font-black uppercase text-[10px] tracking-[0.2em] block">Resumen del Depósito</span>
                    <span className="text-gray-400 font-black uppercase text-[10px]">Envío: {faltaParaGratis <= 0 ? 'GRATIS' : 'Por calcular'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black italic tracking-tighter leading-none">${total}</span>
                  </div>
                </div>
                
                <button
                  onClick={async () => {
                    await createOrder(items)
                    clearCart()
                    toggleCart()
                  }}
                  className="w-full bg-red-600 hover:bg-white hover:text-black py-6 font-black uppercase italic text-xl transition-all duration-500 shadow-[0px_0px_20px_rgba(220,38,38,0.3)] hover:shadow-none relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    SOLTAR EL PAGO 
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}