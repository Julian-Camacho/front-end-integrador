import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";

export default function Sidebar() {
  const { order, total, handleChanqeQuantity, removeItem, sidebarToggle } =
    useOrder();

  return (
    <div className={`order-wrapper ${sidebarToggle ? "active" : ""}`}>
      <div className="list-container">
        <h2>Orden actual:</h2>
        <ul className="order-list">
          {order.map((product) => {
            return (
              <li className="order-item" key={product.id}>
                <img
                  className="order-picture"
                  src={
                    product.picture ??
                    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                  }
                  alt=""
                />
                <div className="order-item-name" title={product.name}>
                  {product.name}
                </div>
                <div className="order-quantity">
                  <input
                    type="number"
                    className="order-quantity-input"
                    value={product.quantity}
                    onChange={(evt) =>
                      handleChanqeQuantity(product.id, evt.target.value)
                    }
                    min={1}
                    max={100}
                  />
                </div>
                <div className="order-subtotal">
                  $ {product.price * product.quantity}
                </div>
                <div className="order-actions">
                  <FontAwesomeIcon
                    icon={faTrash}
                    title="Eliminar producto"
                    onClick={() => removeItem(product.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="order-finish">
        <div className="total">
          <div className="total-price">
            Total $ <span>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
