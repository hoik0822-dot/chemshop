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
    <div>
      {/* 히어로 */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <FlaskConical className="h-12 w-12 opacity-80" />
          </div>
          <h1 className="text-4xl font-bold mb-3">연구실 시약 전문 쇼핑몰</h1>
          <p className="text-blue-200 text-lg mb-8">
            CAS 번호 또는 시약명으로 바로 검색하세요
          </p>
          {/* CAS 번호 검색 */}
          <form onSubmit={handleSearch} className="flex max-w-lg mx-auto gap-2">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="CAS 번호 또는 시약명 입력 (예: 64-17-5)"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1"
            >
              <Search className="h-4 w-4" /> 검색
            </button>
          </form>
          <Link to="/products" className="inline-block mt-4 text-blue-200 text-sm hover:text-white underline">
            전체 시약 보기 →
          </Link>
        </div>
      </section>

      {/* 특징 */}
      <section className="bg-white border-y border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Truck className="h-8 w-8 mx-auto text-blue-600" />, title: '빠른 배송', desc: '주문 확인 후 2~3일 내 배송' },
            { icon: <ShieldCheck className="h-8 w-8 mx-auto text-blue-600" />, title: '정품 보장', desc: '공인 공급업체를 통한 정품만 취급' },
            { icon: <Clock className="h-8 w-8 mx-auto text-blue-600" />, title: '간편 주문', desc: 'ChemLab에서 구매 버튼 한 번으로 주문' },
          ].map(f => (
            <div key={f.title}>
              {f.icon}
              <h3 className="font-bold text-gray-800 mt-3 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
