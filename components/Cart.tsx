"use client"

import { useCart } from "@/store/cart"
import { createOrder } from "@/lib/createOrder"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Cart() {
  const { items, clearCart, removeItem, updateQuantity, isOpen, toggleCart } = useCart()

  const total = items.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0)
  const metaEnvioGratis = 70000
  const faltaParaGratis = metaEnvioGratis - total

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[150] cursor-crosshair"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[200] flex flex-col shadow-[[-20px_0px_50px_rgba(0,0,0,0.8)]]"
          >
            {/* Header se mantiene igual */}
            <div className="p-8 border-b border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                    TU <span className="text-red-600">BOTÍN</span>
                  </h2>
                  <p className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mt-2">
                    {items.length} MODELOS LISTOS
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
                      {faltaParaGratis <= 0 ? "¡ENVÍO GRATIS ACTIVADO!" : `TE FALTAN $${faltaParaGratis.toLocaleString('es-CL')} PARA ENVÍO GRATIS`}
                    </span>
                    <span className="text-gray-600">{Math.min(100, (total / metaEnvioGratis) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (total / metaEnvioGratis) * 100)}%` }}
                      className={`h-full ${faltaParaGratis <= 0 ? 'bg-green-500' : 'bg-red-600'}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Lista de productos */}
            <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <p className="text-white/10 italic uppercase font-black text-2xl tracking-tighter">
                    EL ARSENAL <br /> ESTÁ VACÍO
                  </p>
                  <button onClick={toggleCart} className="border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    VOLVER AL DEPÓSITO
                  </button>
                </div>
              ) : (
                items.map((item: any) => (
                  <motion.div
                    key={`${item.id}-${item.talla}`}
                    layout
                    className="flex gap-4 items-center bg-zinc-900/20 p-3 border border-white/5 rounded-xl relative overflow-hidden"
                  >
                    <div className="relative h-20 w-20 bg-black border border-white/10 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.imagen} alt={item.nombre} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-grow space-y-1">
                      <h4 className="text-[11px] font-black uppercase italic tracking-tighter line-clamp-1">{item.nombre}</h4>
                      
                      {/* --- NUEVA ETIQUETA DE PERSONALIZACIÓN --- */}
                      {item.custom_config && (
                        <div className="flex items-center gap-1.5 py-1">
                          <span className="inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                          <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter italic">
                            Custom Drop: {item.custom_config.ancho_impresion_cm}x{item.custom_config.alto_impresion_cm}cm
                          </span>
                        </div>
                      )}

                      <p className="text-[9px] font-bold text-gray-500 uppercase">Talla: {item.talla || 'Única'}</p>
                      <p className="text-sm font-black text-red-600 italic">${Number(item.precio).toLocaleString('es-CL')}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex border border-white/10 items-center rounded-md overflow-hidden bg-black">
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors font-black"
                          >-</button>
                          <span className="w-8 text-center text-[10px] font-black border-x border-white/5">{item.cantidad}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors font-black"
                          >+</button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 group"
                        >
                          <svg className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer se mantiene igual */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-black space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-gray-600 font-black uppercase text-[10px] tracking-[0.2em] block">TOTAL BOTÍN</span>
                    <span className="text-gray-400 font-black uppercase text-[10px]">Envío: {faltaParaGratis <= 0 ? 'GRATIS' : 'Por calcular'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black italic tracking-tighter leading-none">${total.toLocaleString('es-CL')}</span>
                  </div>
                </div>
                
                <button
                  onClick={async () => {
                    await createOrder(items)
                    clearCart()
                    toggleCart()
                  }}
                  className="w-full bg-red-600 hover:bg-white hover:text-black py-5 font-black uppercase italic text-xl transition-all duration-500 group relative overflow-hidden rounded-xl"
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