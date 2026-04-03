import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1. Actualizamos la interfaz para incluir la configuración de personalización
export interface CartItem {
  id: string
  nombre: string
  precio: number
  imagen: string
  cantidad: number
  talla?: string
  // Añadimos el objeto de personalización como opcional
  custom_config?: {
    prenda: string
    diseño_png: string
    ancho_impresion_cm: number
    alto_impresion_cm: number
    posicion: { x: number; y: number }
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, talla?: string) => void // Mejoramos esto para manejar duplicados con distinta talla
  updateQuantity: (id: string, quantity: number, talla?: string) => void
  toggleCart: () => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => set((state) => {
        // Buscamos si existe el mismo producto con la misma talla Y la misma configuración custom
        const existingItem = state.items.find(item => 
          item.id === newItem.id && 
          item.talla === newItem.talla &&
          JSON.stringify(item.custom_config) === JSON.stringify(newItem.custom_config)
        )

        if (existingItem) {
          return {
            items: state.items.map(item =>
              (item.id === newItem.id && item.talla === newItem.talla && JSON.stringify(item.custom_config) === JSON.stringify(newItem.custom_config))
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          }
        }
        return { items: [...state.items, newItem], isOpen: true } // Abrimos el carro al añadir
      }),

      // Ajustamos removeItem para que sea preciso con el ID y la talla
      removeItem: (id, talla) => set((state) => ({
        items: state.items.filter(item => !(item.id === id && item.talla === talla))
      })),

      updateQuantity: (id, quantity, talla) => set((state) => ({
        items: state.items.map(item => 
          (item.id === id && item.talla === talla) 
            ? { ...item, cantidad: Math.max(1, quantity) } 
            : item
        )
      })),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
      }
    }),
    { name: 'jimmweb-storage' }
  )
)