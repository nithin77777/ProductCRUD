"use client";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Home(params) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');


  // Fetching Products From backend api
  const fetchProducts = async() =>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/');
      setProducts(response.data)
      console.log(response.data);
      
    }catch(err){
      console.error("Error Fetching Backend Products",err);
      
    }
  }

// Adding a New Product

const addProduct = async (e) => {
  e.preventDefault(); // It prevents form submission by default

  const productData = {name, description, price};

  try{
    await axios.post('http://127.0.0.1:8000/add_product/',productData);
    fetchProducts();
    setName('');
    setDescription('');
    setPrice('');
  }catch(err){
    console.error("Error Adding Product",err);
    
  }
};

useEffect(()=>{
  fetchProducts();
}, [])


return(
  <div>
    <h1>Product Management</h1>
    <form onSubmit={addProduct}>
      <input type="text" value={name} placeholder="Product name" onChange={(e)=>setName(e.target.value)}/>
      <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          
        />
         <button type="submit">Add Product</button>
    </form>

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

}