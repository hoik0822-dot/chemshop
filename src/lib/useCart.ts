import { useState, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  cas_number?: string
  manufacturer?: string
  price: number
  quantity: number
  unit: string
  concentration?: string
}

const CART_KEY = 'chemshop_cart'

function loadCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') } catch { return [] }
}

let listeners: (() => void)[] = []
let cart: CartItem[] = loadCart()

function saveCart(c: CartItem[]) {
  cart = c
  localStorage.setItem(CART_KEY, JSON.stringify(c))
  listeners.forEach(fn => fn())
}

export function useCart() {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const fn = () => forceUpdate(n => n + 1)
    listeners.push(fn)
    return () => { listeners = listeners.filter(l => l !== fn) }
  }, [])

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const existing = cart.find(i => i.id === item.id)
    if (existing) {
      saveCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i))
    } else {
      saveCart([...cart, { ...item, quantity: item.quantity ?? 1 }])
    }
  }

  const removeItem = (id: string) => saveCart(cart.filter(i => i.id !== id))

  const updateQty = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id)
    saveCart(cart.map(i => i.id === id ? { ...i, quantity } : i))
  }

  const clearCart = () => saveCart([])

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return { items: cart, addItem, removeItem, updateQty, clearCart, total }
}
