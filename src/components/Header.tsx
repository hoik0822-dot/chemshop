import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, FlaskConical, Search } from 'lucide-react'
import { useCart } from '../lib/useCart'
import { useState } from 'react'

export default function Header() {
  const { items } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const total = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-blue-700 flex-shrink-0">
          <FlaskConical className="h-6 w-6" />
          ChemShop
        </Link>

        {/* 검색 */}
        <form
          className="flex-1 flex"
          onSubmit={e => { e.preventDefault(); navigate(`/products?q=${encodeURIComponent(q)}`) }}
        >
          <div className="flex w-full max-w-xl border border-gray-300 rounded-lg overflow-hidden">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="시약명, CAS 번호로 검색..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button type="submit" className="px-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* 장바구니 */}
        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors">
          <ShoppingCart className="h-6 w-6" />
          {total > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {total}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
