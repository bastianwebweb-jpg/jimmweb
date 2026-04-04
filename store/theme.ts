import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeType = 'rap' | 'anime' | 'normal'

interface ThemeState {
  frecuencia: ThemeType
  setFrecuencia: (theme: ThemeType) => void
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      frecuencia: 'rap', // Tu estilo base actual
      setFrecuencia: (theme) => set({ frecuencia: theme }),
    }),
    { name: 'jimmweb-frecuencia' }
  )
)