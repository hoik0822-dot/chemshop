import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Order } from '../lib/supabase'
import { Package, Clock, CheckCircle, Truck } from 'lucide-react'

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:   { label: '주문접수', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: '확인완료', color: 'bg-blue-100 text-blue-700' },
  shipped:   { label: '배송중',   color: 'bg-purple-100 text-purple-700' },
  delivered: { label: '배송완료', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '취소',     color: 'bg-red-100 text-red-700' },
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders((data ?? []) as Order[])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    fetchOrders()
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">주문 관리</h1>

      {/* 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { key: 'all', label: '전체', icon: <Package className="h-5 w-5" />, color: 'text-gray-600' },
          { key: 'pending', label: '신규 주문', icon: <Clock className="h-5 w-5" />, color: 'text-yellow-600' },
          { key: 'confirmed', label: '확인완료', icon: <CheckCircle className="h-5 w-5" />, color: 'text-blue-600' },
          { key: 'shipped', label: '배송중', icon: <Truck className="h-5 w-5" />, color: 'text-purple-600' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`bg-white rounded-xl p-4 text-left shadow-sm border transition-all ${filter === s.key ? 'border-blue-400 ring-1 ring-blue-200' : 'border-gray-100 hover:border-gray-300'}`}
          >
            <div className={`${s.color} mb-1`}>{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{counts[s.key as keyof typeof counts]}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </button>
        ))}
      </div>

      {/* 주문 목록 */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">불러오는 중...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">주문이 없습니다</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-bold text-gray-800">{order.buyer_name}</p>
                  <p className="text-sm text-gray-500">{order.buyer_email} · {order.buyer_phone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.address}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_LABEL[order.status]?.color}`}>
                    {STATUS_LABEL[order.status]?.label}
                  </span>
                  <p className="text-sm font-bold text-blue-700 mt-1">{order.total_price.toLocaleString()}원</p>
                  <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('ko-KR')}</p>
                </div>
              </div>

              {/* 주문 상품 */}
              <div className="border-t border-gray-100 pt-3 mb-3">
                {(order.items as any[]).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="text-gray-700">{item.name} × {item.quantity}{item.unit}</span>
                    <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                ))}
              </div>

              {order.memo && <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg mb-3">메모: {order.memo}</p>}

              {/* 상태 변경 */}
              <div className="flex gap-2 flex-wrap">
                {Object.entries(STATUS_LABEL).map(([key, { label }]) => (
                  <button
                    key={key}
                    disabled={order.status === key}
                    onClick={() => updateStatus(order.id, key)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${order.status === key ? 'bg-gray-100 text-gray-400 cursor-default border-gray-200' : 'hover:bg-gray-100 border-gray-200 text-gray-600'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
