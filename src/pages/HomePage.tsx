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
      <FlaskConical className="h-12 w-12 text-blue-600 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">ChemShop</h1>
      <p className="text-gray-400 mb-10 text-sm">연구실 시약 전문 쇼핑몰</p>

      <form onSubmit={handleSearch} className="w-full max-w-lg flex shadow-md rounded-2xl overflow-hidden border border-gray-200">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="CAS 번호 또는 시약명 입력  예) 64-17-5"
          className="flex-1 px-5 py-4 text-gray-800 text-sm outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 flex items-center gap-2 transition-colors font-semibold"
        >
          <Search className="h-4 w-4" />
          검색
        </button>
      </form>
    </div>
  )
}
