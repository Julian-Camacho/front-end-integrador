import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import removeDecimals from "../../services/utils/NumFormat";
import { formatTimestampToUserDate } from "../../services/utils/DateFormat";

export default function ProductCard({ product }) {
  const { addProductToOrder } = useOrder();

  return (
    <div className="card-wrapper">
      <article className="card">
        <div className="card-header">
          <img
            className="card-img card-image-1"
            src={`http://localhost:3000/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="card-main">
          <div className="card-top">
            <h4 className="card-category">{product.category.viewValue}</h4>
            <span className="card-date">
              {formatTimestampToUserDate(product.createdAt)}
            </span>
          </div>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-description">{product.description} </p>
          <div className="card-price">
            <span className="price">${removeDecimals(product.price)}</span>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="add-to-cart"
            onClick={() => addProductToOrder(product)}
          >
            Añadir al Carrito
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <Link to={`/product-detail/${product._id}`}>
            <button className="more-info">
              Más info <FontAwesomeIcon icon={faCircleInfo} />
            </button>
          </Link>
        </div>
      </article>
    </div>
  );
}
