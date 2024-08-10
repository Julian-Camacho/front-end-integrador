import './Home.css'
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
import { faCreditCardAlt } from '@fortawesome/free-regular-svg-icons';
import ProductList from '../../components/product-list/ProductList';

export default function Home(){
    
    const coursesSection = useRef(null);

    return (
        <>
            <section className="main-banner">
                <h1 className="main-title">BIENVENIDOS</h1>
                <div className="slider">
                    <ul>
                        <li><img src="https://imgur.com/ZTFpS9m.jpg" alt="Perchero"/></li>
                        <li><img src="https://imgur.com/6h3wNFC.jpg" alt="Perchero-2"/></li>
                        <li><img src="https://imgur.com/gjSrI8a.jpg" alt="Tienda"/></li>
                    </ul>
                </div>
            </section>
            <div className="products-display" id="products-display" ref={coursesSection}>
                <ProductList/>
            </div>
            <section className="our-services">
                <div className="payment">
                    <FontAwesomeIcon icon={faCreditCardAlt} />
                    <h2>Todos los medios de pago</h2>
                </div>
                <div className="support">
                <FontAwesomeIcon icon={faTruckFast} />
                    <h2>Envíos a todo el pais</h2>
                </div>
                <div className="locations">
                    <FontAwesomeIcon icon={faBoxesPacking} />
                    <h2>Devoluciones dentro de los 30 días</h2>
                </div>
            </section>
        </>
    )
}