import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FlaskConical, Truck, ShieldCheck, Clock, Search } from 'lucide-react'

export default function HomePage() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) navigate(`/products?q=${encodeURIComponent(q.trim())}`)
    else navigate('/products')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white/20 rounded-2xl p-4">
              <FlaskConical className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">연구실 시약 전문 쇼핑몰</h1>
          <p className="text-blue-100 text-base md:text-lg mb-10">
            CAS 번호 또는 시약명으로 필요한 시약을 바로 찾아보세요
          </p>

          {/* 검색창 */}
          <form onSubmit={handleSearch} className="flex max-w-xl mx-auto shadow-xl rounded-2xl overflow-hidden">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="CAS 번호 또는 시약명 입력  예) 64-17-5 / 에탄올"
              className="flex-1 px-5 py-4 bg-white text-gray-800 text-sm outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-4 flex items-center gap-2 transition-colors"
            >
              <Search className="h-4 w-4" />
              검색
            </button>
          </form>

          <Link to="/products" className="inline-block mt-5 text-blue-200 text-sm hover:text-white transition-colors">
            전체 시약 목록 보기 →
          </Link>
        </div>
      </section>

      {/* 특징 */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Truck className="h-7 w-7 text-blue-600" />, title: '빠른 배송', desc: '주문 확인 후 2~3일 내 배송' },
            { icon: <ShieldCheck className="h-7 w-7 text-blue-600" />, title: '정품 보장', desc: '공인 공급업체를 통한 정품만 취급' },
            { icon: <Clock className="h-7 w-7 text-blue-600" />, title: '간편 주문', desc: 'ChemLab에서 구매 버튼 한 번으로 주문' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-50 rounded-xl p-3 flex-shrink-0">{f.icon}</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
