import './ProductList.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from '../product-card/ProductCard';

const baseURL = 'https://6622ed3e3e17a3ac846e404e.mockapi.io/api'

export default function ProductList(){
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}/products`)
        .then(res => {
            setProducts(res.data)
        })
    }, [])

    return(
        <div className="product-list">
            <h1>Lo último en Moda</h1>
            <div className="product-list-container">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}