'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartStore {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getTotalPrice: () => number
    getTotalItems: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id)

                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        }
                    }

                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                    }
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                })),

            clearCart: () => set({ items: [] }),

            getTotalPrice: () => {
                const state = get()
                return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
            },

            getTotalItems: () => {
                const state = get()
                return state.items.reduce((total, item) => total + item.quantity, 0)
            },
        }),
        {
            name: 'cart-store',
        }
    )
)
