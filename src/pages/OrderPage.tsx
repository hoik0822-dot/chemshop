import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../lib/useCart'
import { supabase } from '../lib/supabase'

export default function OrderPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    buyer_name: '', buyer_email: '', buyer_phone: '', address: '', memo: ''
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.buyer_name || !form.buyer_email || !form.buyer_phone || !form.address) return
    setLoading(true)
    const { error } = await supabase.from('orders').insert({
      ...form,
      items: items.map(i => ({ product_id: i.id, name: i.name, quantity: i.quantity, unit: i.unit, price: i.price })),
      total_price: total,
      status: 'pending',
    })
    if (!error) {
      clearCart()
      navigate('/order/complete')
    }
    setLoading(false)
  }

  if (items.length === 0) { navigate('/cart'); return null }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">주문 정보 입력</h1>

      {/* 주문 상품 요약 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <h2 className="font-semibold text-gray-700 mb-3 text-sm">주문 상품</h2>
        {items.map(i => (
          <div key={i.id} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-gray-700">{i.name} × {i.quantity}{i.unit}</span>
            <span className="font-semibold text-gray-800">{(i.price * i.quantity).toLocaleString()}원</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-blue-700 mt-3 pt-2 border-t border-gray-100">
          <span>합계</span>
          <span>{total.toLocaleString()}원</span>
        </div>
      </div>

      {/* 주문자 정보 */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700 mb-2">배송 정보</h2>
        {[
          { key: 'buyer_name', label: '이름', placeholder: '홍길동', type: 'text' },
          { key: 'buyer_email', label: '이메일', placeholder: 'researcher@lab.ac.kr', type: 'email' },
          { key: 'buyer_phone', label: '연락처', placeholder: '010-0000-0000', type: 'tel' },
          { key: 'address', label: '배송 주소', placeholder: '서울시 강남구 테헤란로 123', type: 'text' },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label} *</label>
            <input
              type={f.type}
              required
              placeholder={f.placeholder}
              value={form[f.key as keyof typeof form]}
              onChange={e => set(f.key, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">요청사항 (선택)</label>
          <textarea
            placeholder="배송 요청사항이나 특이사항을 입력해주세요"
            value={form.memo}
            onChange={e => set('memo', e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 resize-none"
          />
        </div>

        <div className="pt-2 text-xs text-gray-400 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
          💳 현재 계좌이체 방식으로 운영됩니다. 주문 확인 후 입금 안내 메일을 드립니다.
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors text-lg disabled:opacity-60"
        >
          {loading ? '주문 접수 중...' : `${total.toLocaleString()}원 주문하기`}
        </button>
      </form>
    </div>
  )
}
