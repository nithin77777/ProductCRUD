"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails({ params }) {
    const [product, setProduct] = useState(null);
    const { id } = params; // Get the product ID from the URL parameters

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return; // Do not fetch if id is not available

            try {
                const response = await axios.get(`http://127.0.0.1:8000/product/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>; // Show loading while fetching data

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
        </div>
    );
}
