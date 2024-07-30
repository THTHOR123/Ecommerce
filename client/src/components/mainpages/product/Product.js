import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList/ProductList'

const Product = () => {

  const state = useContext(GlobalState)
  const [products] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [category, setCategory] = state.productAPI.category;

  return (

    <div>
      <div className='category'>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                    <option value="Category 3">Category 3</option>
                </select>
            </div>
    
    <div className='products'>
      
      {
        products.map(product=>{
          return <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
        })
      }
    </div>

    </div>
  )
}

export default Product
