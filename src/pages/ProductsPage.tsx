import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from "../lib/supabase"
import type { Product } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import { Search } from 'lucide-react'

export default function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState(params.get('q') ?? '')

  useEffect(() => {
    fetchProducts(params.get('q') ?? '')
  }, [params])

  const fetchProducts = async (search: string) => {
    setLoading(true)
    let query = supabase.from('products').select('*').eq('is_active', true).order('name')
    if (search) {
      query = query.or(`name.ilike.%${search}%,cas_number.ilike.%${search}%,manufacturer.ilike.%${search}%`)
    }
    const { data } = await query
    setProducts((data ?? []) as Product[])
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setParams(q ? { q } : {})
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">시약 목록</h1>

      {/* 검색 */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="flex flex-1 max-w-lg border border-gray-300 rounded-lg overflow-hidden">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="시약명, CAS 번호, 제조사 검색..."
            className="flex-1 px-4 py-2 text-sm outline-none"
          />
          <button type="submit" className="px-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-20 text-gray-400">불러오는 중...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">검색 결과가 없습니다</p>
          <p className="text-sm mt-1">다른 키워드로 검색해 보세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
