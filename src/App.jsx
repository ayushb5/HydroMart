import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import MainLayout from './Layout/MainLayout'
import AdminLayout from './Layout/AdminLayout'

import Home from './Pages/Home'
import Products from './Pages/Products'
import About from './Pages/About'
import Gallery from './Pages/Gallery'
import Contact from './Pages/Contact'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Cart from './Components/CartPage'
import ProductDetail from './Pages/ProductDetail'
import BillingPage from './Components/BillingPage'

import AdminDashboard from './Admin/AdminDashboard'
import AddProduct from './Admin/AddProduct'
import AllProduct from './Admin/AllProduct'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<BillingPage />} />


          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="allProducts" element={<AllProduct />} />
          </Route>
        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
