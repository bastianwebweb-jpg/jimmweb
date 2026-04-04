"use client"

import { useCart } from "@/store/cart"
import { useTheme } from "@/store/theme" // Importamos el tema
import { createOrder } from "@/lib/createOrder"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Cart() {
  const { items, clearCart, removeItem, updateQuantity, isOpen, toggleCart } = useCart()
  const { frecuencia } = useTheme() // Consumimos la frecuencia actual

  const total = items.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0)
  const metaEnvioGratis = 70000
  const faltaParaGratis = metaEnvioGratis - total

  // Configuración de estilos según el tema
  const themeStyles = {
    rap: {
      bg: "bg-[#050505]",
      border: "border-white/10",
      accentText: "text-red-600",
      accentBg: "bg-red-600",
      itemBg: "bg-zinc-900/20",
      btn: "bg-red-600 hover:bg-white hover:text-black",
      textMain: "text-white"
    },
    anime: {
      bg: "bg-[#0a0015]",
      border: "border-cyan-500/20",
      accentText: "text-cyan-400",
      accentBg: "bg-cyan-400",
      itemBg: "bg-cyan-950/10",
      btn: "bg-cyan-500 text-black hover:bg-white",
      textMain: "text-white"
    },
    normal: {
      bg: "bg-white",
      border: "border-zinc-200",
      accentText: "text-black",
      accentBg: "bg-black",
      itemBg: "bg-zinc-50",
      btn: "bg-black text-white hover:bg-zinc-800",
      textMain: "text-black"
    }
  }

  const s = themeStyles[frecuencia] || themeStyles.rap

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
            className={`fixed right-0 top-0 h-full w-full max-w-md ${s.bg} border-l ${s.border} z-[200] flex flex-col shadow-2xl transition-colors duration-500`}
          >
            {/* Header */}
            <div className={`p-8 border-b ${s.border}`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-4xl font-black uppercase italic tracking-tighter leading-none ${s.textMain}`}>
                    TU <span className={s.accentText}>BOTÍN</span>
                  </h2>
                  <p className="text-[10px] font-black text-zinc-500 tracking-[0.3em] uppercase mt-2">
                    {items.length} MODELOS LISTOS
                  </p>
                </div>
                <button onClick={toggleCart} className={`group p-2 font-black ${s.accentText}`}>
                  [ X ]
                </button>
              </div>

              {items.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className={faltaParaGratis <= 0 ? "text-green-500" : "text-zinc-500"}>
                      {faltaParaGratis <= 0 ? "¡ENVÍO GRATIS ACTIVADO!" : `TE FALTAN $${faltaParaGratis.toLocaleString('es-CL')} PARA ENVÍO GRATIS`}
                    </span>
                    <span className="text-zinc-500">{Math.min(100, (total / metaEnvioGratis) * 100).toFixed(0)}%</span>
                  </div>
                  <div className={`h-1.5 w-full ${frecuencia === 'normal' ? 'bg-zinc-100' : 'bg-white/5'} rounded-full overflow-hidden`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (total / metaEnvioGratis) * 100)}%` }}
                      className={`h-full ${faltaParaGratis <= 0 ? 'bg-green-500' : s.accentBg}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Lista de productos */}
            <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <p className="text-zinc-500/20 italic uppercase font-black text-2xl tracking-tighter">
                    EL ARSENAL <br /> ESTÁ VACÍO
                  </p>
                  <button onClick={toggleCart} className={`border ${s.border} px-6 py-3 text-[10px] font-black uppercase tracking-widest ${s.textMain} hover:${s.accentBg} hover:text-white transition-all`}>
                    VOLVER AL DEPÓSITO
                  </button>
                </div>
              ) : (
                items.map((item: any) => (
                  <motion.div
                    key={`${item.id}-${item.talla}`}
                    layout
                    className={`flex gap-4 items-center ${s.itemBg} p-3 border ${s.border} rounded-xl relative overflow-hidden transition-colors`}
                  >
                    <div className="relative h-20 w-20 bg-black border border-white/10 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.imagen} alt={item.nombre} fill className="object-contain p-2" />
                    </div>
                    
                    <div className="flex-grow space-y-1">
                      <h4 className={`text-[11px] font-black uppercase italic tracking-tighter line-clamp-1 ${s.textMain}`}>{item.nombre}</h4>
                      
                      {item.custom_config && (
                        <div className="flex items-center gap-1.5 py-1">
                          <span className={`inline-block w-1.5 h-1.5 ${s.accentBg} rounded-full animate-pulse`} />
                          <span className={`text-[8px] font-black ${s.accentText} uppercase tracking-tighter italic`}>
                            Custom: {item.custom_config.ancho_impresion_cm}x{item.custom_config.alto_impresion_cm}cm
                          </span>
                        </div>
                      )}

                      <p className="text-[9px] font-bold text-zinc-500 uppercase">Talla: {item.talla || 'Única'}</p>
                      <p className={`text-sm font-black ${s.accentText} italic`}>${Number(item.precio).toLocaleString('es-CL')}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className={`flex border ${s.border} items-center rounded-md overflow-hidden bg-black/5`}>
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                            className={`w-7 h-7 flex items-center justify-center hover:${s.accentBg} hover:text-white transition-colors font-black ${s.textMain}`}
                          >-</button>
                          <span className={`w-8 text-center text-[10px] font-black border-x ${s.border} ${s.textMain}`}>{item.cantidad}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            className={`w-7 h-7 flex items-center justify-center hover:${s.accentBg} hover:text-white transition-colors font-black ${s.textMain}`}
                          >+</button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 group"
                        >
                          <svg className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className={`p-8 border-t ${s.border} ${frecuencia === 'normal' ? 'bg-zinc-50' : 'bg-black'} space-y-6 transition-colors`}>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] block">TOTAL BOTÍN</span>
                    <span className="text-zinc-400 font-black uppercase text-[10px]">Envío: {faltaParaGratis <= 0 ? 'GRATIS' : 'Por calcular'}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-4xl font-black italic tracking-tighter leading-none ${s.textMain}`}>
                      ${total.toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={async () => {
                    try {
                      await createOrder(items)
                      clearCart()
                      toggleCart()
                      alert("PEDIDO RECIBIDO")
                    } catch (error: any) {
                      alert(error.message)
                    }
                  }}
                  className={`w-full ${s.btn} py-5 font-black uppercase italic text-xl transition-all duration-500 group relative overflow-hidden rounded-xl shadow-xl`}
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