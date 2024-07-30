import React, { useContext, useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState';


const DetailProduct = () => {

    const params = useParams();
    console.log(params);
    const state  = useContext(GlobalState);
    const [products] = state.productAPI.products;
    const [detailProduct,setDetailProduct] = useState([]);

    useEffect(()=>{

        if(params){
            products.forEach(product => {

                if(product._id===params.id) setDetailProduct(product)
                
            });
        }
    },[params,products])


    console.log(detailProduct);

    if(detailProduct.length === 0) return null;


  return (
    <div className='detail'>
    <img src={detailProduct.imageUrl} alt=''/>
    <div className='box-detail'>
      <div className='row'>
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
      </div>
      <span>${detailProduct.price}</span> 
      <p>{detailProduct.description}</p> 
      <p>{detailProduct.content}</p>
      <p>Sold:{detailProduct.sold}</p>
      <Link to='/cart' className='cart'>Buy Now</Link>
    </div>
  </div>
  )
}

export default DetailProduct
