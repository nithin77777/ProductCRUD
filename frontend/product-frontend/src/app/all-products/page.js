"use client";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AllProducts(params) {
    const [products, setProducts] = useState([]);

const fetchProducts = async() =>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/');
      setProducts(response.data)
      console.log(response.data);
      
    }catch(err){
      console.error("Error Fetching Backend Products",err);
      
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[]);

  return (
    <div>
        <h2> List products</h2>
    <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p><strong>Price:</strong> {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )

};