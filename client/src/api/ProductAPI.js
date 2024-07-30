import React, { useEffect, useState } from 'react';
import axios from 'axios'

const ProductAPI = () => {

    const [products,setProducts]  = useState([]);
    const [category, setCategory] = useState('');

    const getProducts = async()=>{
        try {
            const url = category ? `/api/products?category=${category}` : '/api/products';
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

   useEffect(()=>{
    getProducts();
   },[category]);

  return {
    products : [products,setProducts],
    category: [category, setCategory]
  }
}

export default ProductAPI
