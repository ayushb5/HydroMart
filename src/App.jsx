import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import MainLayout from './Layout/MainLayout'
import AdminLayout from './Layout/AdminLayout'

import Header from './Components/Header'
import Home from './Pages/Home'
import Products from './Pages/Products'
import About from './Pages/About'
import Gallery from './Pages/Gallery'
import Contact from './Pages/Contact'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Footer from './Components/Footer'

import AdminDashboard from './Admin/AdminDashboard'
import AddProduct from './Admin/AddProduct'
import AllProduct from './Admin/AllProduct'
import Sidebar from './Components/Sidebar'

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
