import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../lib/useCart'
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
      <p className="text-gray-500 text-lg mb-4">장바구니가 비어있습니다</p>
      <Link to="/products" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors">
        시약 둘러보기
      </Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">장바구니</h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🧪</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-800 truncate">{item.name}</p>
              {item.cas_number && <p className="text-xs text-gray-400 font-mono">CAS: {item.cas_number}</p>}
              <p className="text-xs text-gray-500">{item.price.toLocaleString()}원 / {item.unit}</p>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors">
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-3 text-sm font-semibold">{item.quantity}</span>
              <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <p className="font-bold text-blue-700 w-24 text-right text-sm">
              {(item.price * item.quantity).toLocaleString()}원
            </p>
            <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 합계 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>총 결제 금액</span>
          <span className="text-blue-700">{total.toLocaleString()}원</span>
        </div>
        <button
          onClick={() => navigate('/order')}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors text-lg"
        >
          주문하기
        </button>
      </div>
    </div>
  )
}
