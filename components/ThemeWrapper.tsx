"use client"
import { useTheme } from "@/store/theme"

export default function ThemeWrapper({ children, producto }: { children: React.ReactNode, producto: any }) {
  const { frecuencia } = useTheme()

  const skins = {
    rap: "theme-rap",
    anime: "theme-anime",
    normal: "theme-normal"
  }

  return (
    <div className={`min-h-screen pt-24 pb-10 transition-colors duration-700 ${skins[frecuencia]}`}>
      {/* Gradiente de fondo dinámico */}
      <div className={`absolute top-0 left-0 w-full h-[500px] -z-10 transition-opacity duration-1000
        ${frecuencia === 'rap' ? 'bg-gradient-to-b from-red-900/20 to-transparent' : 
          frecuencia === 'anime' ? 'bg-gradient-to-b from-cyan-900/20 to-transparent' : 
          'bg-gradient-to-b from-zinc-200 to-transparent'}`} 
      />
      
      <style jsx global>{`
        .theme-rap { --accent: #ef4444; --main: #fff; --bg-card: rgba(24, 24, 27, 0.4); --desc: #a1a1aa; --bg-page: #050505; }
        .theme-anime { --accent: #22d3ee; --main: #fff; --bg-card: rgba(15, 0, 40, 0.6); --desc: #cffafe; --bg-page: #0a0015; }
        .theme-normal { --accent: #18181b; --main: #000; --bg-card: #fff; --desc: #71717a; --bg-page: #f8f8f8; }

        .theme-rap, .theme-anime, .theme-normal { background-color: var(--bg-page); color: var(--main); }
        .text-accent { color: var(--accent) !important; }
        .bg-accent { background-color: var(--accent) !important; }
        .badge-frecuencia { background-color: var(--accent); }
        .border-accent { border-color: var(--accent) !important; }
        .text-main { color: var(--main); }
        .text-description { color: var(--desc); }
        .bg-card-glass { background-color: var(--bg-card); }
      `}</style>
      
      {children}
    </div>
  )
}
