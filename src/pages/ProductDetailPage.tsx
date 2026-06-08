import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Product } from '../lib/supabase'
import { useCart } from '../lib/useCart'
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  // ChemLab Manager에서 바로 구매 시 URL 파라미터로 넘어온 정보
  const fromApp = searchParams.get('from') === 'chemlab'
  const prefilledName = searchParams.get('name')
  const prefilledCas = searchParams.get('cas')

  useEffect(() => {
    if (!id || id === 'direct') { setLoading(false); return }
    supabase.from('products').select('*').eq('id', id).single()
      .then(({ data }) => { setProduct(data as Product); setLoading(false) })
  }, [id])

  const handleAddCart = () => {
    if (!product) return
    addItem({ id: product.id, name: product.name, cas_number: product.cas_number, manufacturer: product.manufacturer, price: product.price, unit: product.unit, concentration: product.concentration, quantity: qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <div className="text-center py-20 text-gray-400">불러오는 중...</div>

  if (!product) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="text-gray-500">상품을 찾을 수 없습니다.</p>
      {fromApp && prefilledName && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700">
          <p className="font-semibold mb-1">"{prefilledName}" 상품이 아직 등록되지 않았습니다.</p>
          {prefilledCas && <p className="text-xs">CAS: {prefilledCas}</p>}
          <p className="mt-2 text-xs">입고 요청을 남겨주시면 빠르게 등록하겠습니다.</p>
        </div>
      )}
      <Link to="/products" className="inline-block mt-6 text-blue-600 hover:underline">← 목록으로 돌아가기</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/products" className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> 목록으로
      </Link>

      {fromApp && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 font-medium">
          ✅ ChemLab Manager에서 연결되었습니다
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* 이미지 */}
        <div className="w-full md:w-48 h-48 bg-blue-50 rounded-2xl flex items-center justify-center text-6xl flex-shrink-0">
          🧪
        </div>

        {/* 정보 */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
          {product.concentration && <p className="text-gray-500 mb-1">{product.concentration}</p>}
          {product.cas_number && <p className="text-sm font-mono text-gray-400 mb-1">CAS: {product.cas_number}</p>}
          {product.manufacturer && <p className="text-sm text-gray-500 mb-4">제조사: {product.manufacturer}</p>}

          {product.description && (
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
          )}

          <div className="text-2xl font-bold text-blue-700 mb-6">
            {product.price.toLocaleString()}원 <span className="text-sm font-normal text-gray-400">/ {product.unit}</span>
          </div>

          {/* 수량 + 담기 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-sm font-semibold min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddCart}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              <ShoppingCart className="h-4 w-4" />
              {added ? '담겼습니다! ✓' : '장바구니 담기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
