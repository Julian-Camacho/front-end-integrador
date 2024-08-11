import "./ProductList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../product-card/ProductCard";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get(`${baseURL}/products`);
      const { products } = response.data;
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="product-list">
      <h1>Lo último en Moda</h1>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
