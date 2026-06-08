import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlaskConical, Search } from 'lucide-react'

export default function HomePage() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) navigate(`/products?q=${encodeURIComponent(q.trim())}`)
    else navigate('/products')
  }

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 bg-white">

      {/* 로고 */}
      <div className="flex flex-col items-center mb-16">
        <FlaskConical className="h-14 w-14 text-blue-600 mb-3" />
        <h1 className="text-4xl font-bold text-gray-800">ChemShop</h1>
        <p className="text-gray-400 text-sm mt-2">연구실 시약 전문 쇼핑몰</p>
      </div>

      {/* 검색창 */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl">
        <div className="flex items-center border border-gray-300 rounded-full px-6 py-4 shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow bg-white gap-3">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="CAS 번호 또는 시약명으로 검색"
            className="flex-1 text-gray-800 text-lg outline-none placeholder-gray-400 bg-transparent"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
        <div className="flex justify-center mt-6 gap-3">
          <button
            type="submit"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            시약 검색
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            전체 시약 보기
          </button>
        </div>
      </form>

    </div>
  )
}
