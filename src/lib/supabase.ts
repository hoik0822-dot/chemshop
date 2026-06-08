import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export interface Product {
  id: string
  name: string
  cas_number?: string
  manufacturer?: string
  concentration?: string
  unit: string
  price: number
  stock_qty?: number
  category?: string
  description?: string
  image_url?: string
  is_active: boolean
  created_at: string
}

export interface Order {
  id: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  address: string
  items: OrderItem[]
  total_price: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  memo?: string
  created_at: string
}

export interface OrderItem {
  product_id: string
  name: string
  quantity: number
  unit: string
  price: number
}
