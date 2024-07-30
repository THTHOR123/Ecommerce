import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from './product/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import DetailProduct from './utils/detailproduct/DetailProduct'

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/detail/:id' element={<DetailProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  )
}

export default Pages
