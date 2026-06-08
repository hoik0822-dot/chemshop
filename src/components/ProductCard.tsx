import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '../lib/supabase'
import { useCart } from '../lib/useCart'

export default function ProductCard({ product: p }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
      <Link to={`/products/${p.id}`} className="p-4 flex-1">
        <div className="w-full h-24 bg-blue-50 rounded-xl flex items-center justify-center mb-3 text-3xl">
          🧪
        </div>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1">{p.name}</h3>
        {p.cas_number && <p className="text-xs text-gray-400 font-mono">CAS: {p.cas_number}</p>}
        {p.concentration && <p className="text-xs text-gray-500">{p.concentration}</p>}
        {p.manufacturer && <p className="text-xs text-gray-400 mt-1">{p.manufacturer}</p>}
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div>
          <span className="font-bold text-blue-700 text-base">
            {p.price.toLocaleString()}원
          </span>
          <span className="text-xs text-gray-400 ml-1">/ {p.unit}</span>
        </div>
        <button
          onClick={() => addItem({ id: p.id, name: p.name, cas_number: p.cas_number, manufacturer: p.manufacturer, price: p.price, unit: p.unit, concentration: p.concentration })}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
