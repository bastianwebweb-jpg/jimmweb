import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  nombre: string
  precio: number
  imagen: string
  cantidad: number
  talla?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
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
        const existingItem = state.items.find(item => item.id === newItem.id && item.talla === newItem.talla)
        if (existingItem) {
          return {
            items: state.items.map(item =>
              (item.id === newItem.id && item.talla === newItem.talla)
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          }
        }
        return { items: [...state.items, newItem] }
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, cantidad: Math.max(1, quantity) } : item
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