import './ProductDetail.css'
import { useEffect, useState } from 'react'
import { useOrder } from '../../context/OrderContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSpinner } from '@fortawesome/free-solid-svg-icons';

const baseUrl= import.meta.env.VITE_SERVER_URL


export default function ProductDetail(){
    const [product, setProduct] = useState()
    const {id} = useParams();    
    const {addProductToOrder} = useOrder();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if(loading){
        return (
            <div className="loader-container">
                <div>
                    <FontAwesomeIcon className='loader' size='2xl' icon={faSpinner} spin />
                </div>
            </div>
        )
    }

    async function getProductById(id){
        try {
            const response = await axios.get(`${baseUrl}/products/${id}`);
            setProduct(response.data.prod)
            setLoading(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "¡Algo salió mal!",
                text: "No se pudo cargar la pagina del producto.",
                confirmButtonColor: "#2b285b"
            });
        }
    }

    return (
            <div className="product-detail-container">
                <div className="product-detail">
                    <div className="product-picture">
                        <img src={product?.picture} alt={product?.name}/>
                    </div>
                    <div className="about-product">
                        <h2>{product?.name}</h2>
                        <div className="product-price">
                            <h2> ${product?.price}</h2>
                        </div>
                        <p>{product?.description}</p>
                        <div className="product-actions">
                            <button onClick={() => addProductToOrder(product)}><FontAwesomeIcon icon={faCartShopping} /> Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}