"use client"
import { useTheme } from "@/store/theme"

export default function ThemeWrapper({ children, producto }: { children: React.ReactNode, producto: any }) {
  const { frecuencia } = useTheme()

  // LÓGICA PRO: Si el producto tiene categoría, manda el producto. 
  // Si no, manda lo que diga la Navbar (frecuencia).
  const categoriaActiva = producto?.categoria?.toLowerCase() || frecuencia;

  const skins = {
    rap: "theme-rap",
    anime: "theme-anime",
    disney: "theme-disney", // Añadimos Disney
    normal: "theme-normal"
  }

  // Seleccionamos la skin actual. Si no existe en el objeto, usamos 'normal'.
  const currentSkin = skins[categoriaActiva as keyof typeof skins] || skins.normal;

  return (
    <div className={`min-h-screen pt-24 pb-10 transition-all duration-700 ${currentSkin}`}>
      
      {/* Gradiente de fondo dinámico */}
      <div className={`fixed top-0 left-0 w-full h-[800px] -z-10 transition-opacity duration-1000
        ${categoriaActiva === 'rap' ? 'bg-gradient-to-b from-red-900/30 to-transparent' : 
          categoriaActiva === 'anime' ? 'bg-gradient-to-b from-cyan-900/30 to-transparent' : 
          categoriaActiva === 'disney' ? 'bg-gradient-to-b from-blue-400/20 to-transparent' : 
          'bg-gradient-to-b from-zinc-200 to-transparent'}`} 
      />
      
      <style jsx global>{`
        /* --- CONFIGURACIÓN DE VARIABLES POR TEMA --- */
        .theme-rap { 
          --accent: #ef4444; --main: #fff; --bg-card: rgba(24, 24, 27, 0.6); 
          --desc: #a1a1aa; --bg-page: #050505; --font: 'Inter', sans-serif;
        }
        .theme-anime { 
          --accent: #22d3ee; --main: #fff; --bg-card: rgba(15, 0, 40, 0.7); 
          --desc: #cffafe; --bg-page: #0a0015; --font: 'Verdana', sans-serif;
        }
        .theme-disney { 
          --accent: #3b82f6; --main: #1e1b4b; --bg-card: rgba(255, 255, 255, 0.8); 
          --desc: #4b5563; --bg-page: #f0f9ff; --font: 'Georgia', serif;
        }
        .theme-normal { 
          --accent: #18181b; --main: #000; --bg-card: #fff; 
          --desc: #71717a; --bg-page: #f8f8f8; --font: sans-serif;
        }

        /* --- APLICACIÓN AUTOMÁTICA --- */
        .theme-rap, .theme-anime, .theme-disney, .theme-normal { 
          background-color: var(--bg-page); 
          color: var(--main);
          font-family: var(--font);
          transition: all 0.7s ease;
        }

        .text-accent { color: var(--accent) !important; }
        .bg-accent { background-color: var(--accent) !important; }
        .badge-frecuencia { background-color: var(--accent) !important; color: white; }
        .border-accent { border-color: var(--accent) !important; }
        .text-main { color: var(--main); }
        .text-description { color: var(--desc); }
        .bg-card-glass { background-color: var(--bg-card); backdrop-blur: 12px; }
        
        /* Ajuste para que el título del producto siempre use el color principal del tema */
        .product-title { color: var(--main); }
      `}</style>
      
      {children}
    </div>
  )
}