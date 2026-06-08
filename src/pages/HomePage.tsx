import { Link } from 'react-router-dom'
import { FlaskConical, Truck, ShieldCheck, Clock } from 'lucide-react'

const CATEGORIES = [
  { name: '유기용매', icon: '🧪', q: '유기용매' },
  { name: '산/염기', icon: '⚗️', q: '산' },
  { name: '무기염류', icon: '🔬', q: '염화나트륨' },
  { name: '특수시약', icon: '💊', q: '특수' },
]

export default function HomePage() {
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
            ChemLab Manager에서 구매 필요 표시한 시약을 바로 주문하세요
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-lg"
          >
            시약 둘러보기 →
          </Link>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(c => (
            <Link
              key={c.name}
              to={`/products?q=${encodeURIComponent(c.q)}`}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <p className="font-semibold text-gray-700">{c.name}</p>
            </Link>
          ))}
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
