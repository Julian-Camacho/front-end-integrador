import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/interceptor/Interceptor";
import Swal from "sweetalert2";
// import axios from "axios";

export default function Sidebar() {
  const { order, total, handleChanqeQuantity, removeItem, sidebarToggle } =
    useOrder();

  const { user } = useUser();

  // const URL = import.meta.env.VITE_SERVER_URL;
  const api = useApi();

  async function getOrders() {
    try {
      const response = await api.get(`/orders`);
      const orders = response.data.orders;
      console.log("Las ordenes son: \n", orders);
    } catch (error) {
      console.log(error);
    }
  }

  async function finishOrder(usr, order, orderTotal) {
    try {
      if (order.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "¡Orden vacía!",
          text: "Agrega productos al carrito para finalizar la orden",
        });
        return;
      }

      if (!usr) {
        Swal.fire({
          icon: "warning",
          title: "¡Usuario no logueado!",
          text: "Debes iniciar sesión para finalizar la orden",
        });
        return;
      }

      const newOrder = order.map((prod) => {
        return {
          id: prod._id,
          price: prod.price,
          quantity: prod.quantity,
        };
      });
      const products = JSON.stringify(newOrder);
      const user = usr._id;
      const total = orderTotal;

      const string = `{ "products": ${products}, 
                        "user": "${user}", 
                        "total": ${total} }`;

      const obj = JSON.parse(string);

      await api.post(`/orders`, obj);

      getOrders();

      Swal.fire({
        icon: "success",
        title: "Orden finalizada",
        text: "¡Tu orden ha sido registrada con éxito!",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "¡Algo salió mal!",
        text: "Ocurrió un error al finalizar la orden",
      });
    }
  }

  return (
    <div className={`order-wrapper ${sidebarToggle ? "active" : ""}`}>
      <div className="list-container">
        <h2>Orden actual:</h2>
        <ul className="order-list">
          {order.map((product) => {
            return (
              <li className="order-item" key={product._id}>
                <img
                  className="order-picture"
                  src={`http://localhost:3000/${product.image}`}
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
                      handleChanqeQuantity(product._id, evt.target.value)
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
                    onClick={() => removeItem(product._id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="order-finish">
        <div className="total">
          <div className="order-div">
            <button
              className="order-finish-button"
              onClick={() => finishOrder(user, order, total)}
            >
              Finalizar Orden
            </button>
          </div>
          <div className="total-price">
            Total $ <span>{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
