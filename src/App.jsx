import './App.css'
import AboutUs from './pages/about-us/AboutUs'
import AdminProduct from './pages/admin-product/AdminProduct'
import AdminUsers from './pages/admin-users/AdminUsers'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import ProductDetail from './pages/product-detail/ProductDetail'
import Register from './pages/register/Register'
import Layout from './layout/Layout'
import { Route, Routes } from 'react-router-dom'
import AdminGuard from './services/admin-guard/AdminGuard'

function App() {

  return (
    <>
      <Routes>          
        <Route path='/login' element={<Login/>} />
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/> {/* Index es la ruta por defecto */}
          <Route path='contact' element={<Contact/>} />
          <Route path='about-us' element={<AboutUs/>} />
          <Route path='register' element={<Register/>} />
          <Route path='product-detail/:id' element={<ProductDetail/>}/>
          <Route path='admin-product' element={<AdminGuard> <AdminProduct/> </AdminGuard>} />
          <Route path='admin-users' element={<AdminGuard> <AdminUsers/> </AdminGuard>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App