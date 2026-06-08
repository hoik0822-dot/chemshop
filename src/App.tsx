import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import OrderCompletePage from './pages/OrderCompletePage'
import AdminPage from './pages/AdminPage'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/complete" element={<OrderCompletePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  )
}
