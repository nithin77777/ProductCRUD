"use client";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Home(params) {
    // const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    



    const addProduct = async (e) => {
        e.preventDefault(); // It prevents form submission by default
      
        const productData = {name, description, price};
      
        try{
          await axios.post('http://127.0.0.1:8000/add_product/',productData);
          fetchProducts();
          setName('');
          setDescription('');
          setPrice('');
          setSuccessMessage('Product added successfully!');
        }catch(err){
          console.error("Error Adding Product",err);
          setSuccessMessage('');
          
        }
      };

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
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
      )
      
};