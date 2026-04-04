"use client"
import { useTheme } from "@/store/theme"

export default function ThemeSelector() {
  const { frecuencia, setFrecuencia } = useTheme()

  const botones = [
    { id: 'rap', label: 'STREET / RAP', color: 'bg-red-600' },
    { id: 'anime', label: 'NEO / ANIME', color: 'bg-cyan-400' },
    { id: 'normal', label: 'ESSENTIAL', color: 'bg-zinc-200' }
  ]

  return (
    <div className="flex gap-2 p-1 bg-black/50 backdrop-blur-md border border-white/5 rounded-full">
      {botones.map((btn) => (
        <button
          key={btn.id}
          onClick={() => setFrecuencia(btn.id as any)}
          className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all
            ${frecuencia === btn.id 
              ? `${btn.color} text-black scale-105 shadow-lg` 
              : "text-zinc-500 hover:text-white"}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}