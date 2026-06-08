import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function OrderCompletePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-6" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">주문이 접수되었습니다!</h1>
      <p className="text-gray-500 mb-2">확인 후 입금 안내 메일을 드립니다.</p>
      <p className="text-sm text-gray-400 mb-8">영업일 기준 1~2일 내 연락드립니다.</p>
      <Link to="/products" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
        계속 쇼핑하기
      </Link>
    </div>
  )
}
