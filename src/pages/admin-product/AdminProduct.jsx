import "./AdminProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSpinner,
  faTrash,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../layout/modal/Modal";
import Swal from "sweetalert2";
import useApi from "../../services/interceptor/Interceptor";

export default function AdminProduct() {
  const api = useApi();
  const [products, setProducts] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  function handleClose() {
    setIsOpen(false);
    reset();
    setIsEditing(false);
  }

  function handleShow() {
    setIsOpen(true);
  }

  useEffect(() => {
    getProducts();
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <FontAwesomeIcon className="loader" size="2xl" icon={faSpinner} spin />
      </div>
    );
  }

  async function getProducts() {
    try {
      const response = await api.get(`/products`);
      const products = response.data.products;
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditProduct(producto) {
    setIsEditing(true);

    // Setear formulario con los datos de mi producto
    setValue("id", producto._id);
    setValue("name", producto.name);
    setValue("price", producto.price);
    setValue(
      "picture",
      producto.picture
        ? producto.picture
        : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    );
    setValue("description", producto.description);
    setValue("createdAt", producto.createdAt);
    handleShow();
  }

  function onSubmit(data) {
    console.log(data);
    reset();
    handleClose();

    data.createdAt = new Date(data.createdAt).getTime();
    data.price = +data.price;

    if (data.id) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  }

  async function createProduct(product) {
    try {
      const newProduct = await api.post(`/products`, product);
      getProducts();
      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: `¡${newProduct.data.name} agregado correctamente!`,
        confirmButtonColor: "#2b285b",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Algo salió mal!",
        text: "No se pudo agregar el Producto",
        confirmButtonColor: "#2b285b",
      });
    }
  }

  async function updateProduct(product) {
    try {
      const id = product.id;
      await api.put(`/products/${id}`, product);
      getProducts();
      setIsEditing(false);
      reset();
      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: `¡El producto ${product.name} ha sido actualizado correctamente!`,
        confirmButtonColor: "#2b285b",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "¡Algo salió mal!",
        text: "No se pudo actualizar el registro.",
      });
    }
  }

  async function deleteProduct(id) {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estás por eliminar un producto. Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2b285b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            await api.delete(`/products/${id}`);
            getProducts();
            Swal.fire({
              icon: "success",
              title: "¡Listo!",
              text: "Producto eliminado correctamente ♻",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "¡Algo salió mal!",
            text: "No se pudo eliminar el producto.",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
        text: "No se pudo eliminar el producto.",
      });
    }
  }

  async function getCategories() {
    try {
      const response = await api.get(`/categories`);

      const categoriesDB = response.data.categories;

      setCategories(categoriesDB);
    } catch (error) {
      console.log("Error al obtener categorias:", error);
    }
  }

  return (
    <>
      <div className="admin-products-container">
        <div className="add-btn-container">
          <button onClick={handleShow}>+ Agregar</button>
        </div>
        <div className="table-container">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="td-image">
                    <img
                      className="product-image"
                      src={product.picture}
                      alt="Producto"
                    />
                  </td>
                  <td className="td-name">{product.name}</td>
                  <td className="td-description">{product.description}</td>
                  <td className="td-date">{product.createdAt}</td>
                  <td className="td-price">${product.price}</td>
                  <td className="td-actions">
                    <button
                      className="td-button-edit"
                      onClick={() => handleEditProduct(product)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="td-button-delete"
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">Panel de administración de productos.</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        title={isEditing ? "Editar Producto" : "Agregar Producto"}
      >
        {" "}
        {/* Llamo al modal */}
        <>
          <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <div className="input-group">
              <label htmlFor="name" className="form-label">
                Nombre del Producto
              </label>
              <input
                type="text"
                className="form-control"
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 100,
                })}
              />
              {errors.name?.type === "required" && (
                <span className="input-error">El campo es requerido.</span>
              )}

              {(errors.name?.type === "minLength" ||
                errors.name?.type === "maxLength") && (
                <span className="input-error">
                  La cantidad de caracteres es invalida
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control text-area"
                cols={50}
                rows={4}
                {...register("description", {
                  required: true,
                  minLength: 3,
                  maxLength: 3000,
                })}
              />
              {errors.description?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}

              {(errors.description?.type === "minLength" ||
                errors.description?.type === "maxLength") && (
                <span className="input-error">
                  La cantidad de caracteres es invalida
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                {...register("category", { required: faTruckMedical })}
              >
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.viewValue}
                  </option>
                ))}
              </select>
              {errors.category?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                {...register("price")}
                min={1}
              />
            </div>
            <div className="input-group">
              <label htmlFor="createdAt" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                {...register("createdAt")}
              />
            </div>
            <div className="input-group">
              <label htmlFor="image" className="form-label">
                Imagen (URL)
              </label>
              <input
                type="url"
                className="form-control"
                {...register("picture")}
              />
            </div>
            <div className="btn-submit-container">
              <button className="cancel-btn" onClick={handleClose}>
                Cerrar
              </button>
              <button
                type="submit"
                className={isEditing ? "edit-btn" : "submit-btn"}
                id="btn-submit"
              >
                {isEditing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
}
