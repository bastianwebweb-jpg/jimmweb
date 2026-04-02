"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  const texts = [
    "ENVÍOS A TODO CHILE",
    "DISEÑO INDEPENDIENTE",
    "CONCEPCIÓN STREETWEAR",
    "DROP EXCLUSIVO 2026",
    "JIMMWEB ARSENAL",
    "CALIDAD PREMIUM",
  ]

  return (
    <div className="relative w-full bg-red-600 py-4 overflow-hidden border-y-2 border-black flex items-center">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="flex whitespace-nowrap gap-10"
      >
        {/* Repetimos el contenido para que el loop sea infinito e invisible */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-10">
            {texts.map((text, index) => (
              <span
                key={index}
                className="text-black font-black uppercase italic text-2xl tracking-tighter"
              >
                {text} <span className="ml-10 text-white">/</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}