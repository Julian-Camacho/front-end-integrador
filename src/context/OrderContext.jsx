/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

//Contexto de la orden
const OrderContext = createContext();

//Hook para usar el contexto de la orden
export const useOrder = () => useContext(OrderContext);

//Provider de la orden
export const OrderProvider = ({ children }) => {
  //Estado de la orden
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) || []
  );

  //Estado del contador
  const [count, setCount] = useState(0);

  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    calculateTotal();
    calculateCount();
  }, [order]);

  const [total, setTotal] = useState(0);

  function calculateTotal() {
    let totalCount = 0;

    order.forEach((prod) => {
      totalCount += prod.price * prod.quantity;
    });

    setTotal(totalCount);
  }

  function calculateCount() {
    let count = 0;
    order.forEach((prod) => (count += prod.quantity));

    setCount(count);
  }

  //Function Agregar producto

  function addProductToOrder(producto) {
    // Buscar en la orden si existe el producto y si existe añadimos 1 a quantity. Si no existe lo añadimos al array

    const product = order.find((prod) => prod.id === producto.id);

    if (product) {
      handleChanqeQuantity(product.id, product.quantity + 1);
    } else {
      producto.quantity = 1;

      // Un array nuevo con todo lo que esta en order mas el producto que recibo
      setOrder([...order, producto]);
      localStorage.setItem("order", JSON.stringify([...order, producto]));

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
      });
      Toast.fire({
        customClass: {
          container: "modal-confirm",
        },
        icon: "success",
        title: "Producto agregado con éxito",
      });
    }
  }

  function handleChanqeQuantity(id, quantity) {
    const updatedOrder = order.map((item) => {
      if (item.id === id) {
        item.quantity = +quantity;
      }
      return item;
    });

    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    });
    Toast.fire({
      customClass: {
        container: "modal-confirm",
      },
      icon: "success",
      title: "Cantidad actualizada exitosamente.",
    });
  }

  function removeItem(id) {
    Swal.fire({
      title: "Borrar producto",
      text: "¿Realmente deseas quitar este producto?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Borrar",
      confirmButtonColor: "var(--secondary-color)",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "var(--primary-color)",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updOrder = order.filter(
          (prod) => prod.id !== id
        ); /* Todos los productos devuelve menos cuando el id del producto es distinto al recibido (el que quiero eliminar) ya que devuelve false */
        setOrder(updOrder);
        localStorage.setItem("order", JSON.stringify(updOrder));
      }
    });
  }

  function toggleSidebarOrder() {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        addProductToOrder,
        total,
        handleChanqeQuantity,
        removeItem,
        toggleSidebarOrder,
        sidebarToggle,
        count,
      }}
    >
      {children}
    </OrderContext.Provider>
    //El provider es el que va a envolver a toda la aplicación
  );
};
