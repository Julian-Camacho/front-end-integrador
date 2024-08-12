import "./AdminUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../layout/modal/Modal";
import Swal from "sweetalert2";
import useApi from "../../services/interceptor/Interceptor";

export default function AdminUsers() {
  const api = useApi();
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] =
    useState(false); /* Seteo un estado para el Modal */
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleClose() {
    setIsOpen(false);
    reset();
    setIsEditing(false);
  }

  function handleShow() {
    setIsOpen(true);
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <FontAwesomeIcon className="loader" size="2xl" icon={faSpinner} spin />
      </div>
    );
  }

  async function getUsers() {
    try {
      const response = await api.get(`/users`);
      const usuarios = response.data.users;
      setUsers(usuarios);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditUser(usuario) {
    setIsEditing(true);

    // Setear formulario con los datos de mi producto
    setValue("id", usuario._id);
    setValue("image", usuario.image);
    setValue("fullName", usuario.fullName);
    setValue("email", usuario.email);
    setValue("phone", usuario.phone);
    setValue("bornDate", usuario.bornDate);

    handleShow();
  }

  function onSubmit(data) {
    reset();
    handleClose();

    console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", +data.phone);
    formData.append("bornDate", new Date(data.bornDate).getTime());
    formData.append("id", data.id);

    if (data.id) {
      updateUser(formData);
    } else {
      createUser(formData);
    }
  }

  async function createUser(usuario) {
    try {
      const name = usuario.get("fullName");
      await api.post(`/users`, usuario);
      getUsers();
      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: `${name} ha sido agregado correctamente.`,
        confirmButtonColor: "#2b285b",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "¡Algo salió mal!",
        text: "No se pudo agregar el usuario.",
        confirmButtonColor: "#2b285b",
      });
    }
  }

  async function updateUser(user) {
    try {
      const id = user.get("id");
      const name = user.get("fullName");
      await api.put(`/users/${id}`, user);
      getUsers();
      setIsEditing(false);
      reset();
      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: `Usuario ${name} ha sido actualizado correctamente.`,
        confirmButtonColor: "#2b285b",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
        text: "No se pudo actualizar el registro.",
      });
    }
  }

  async function deleteUser(id) {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Estás por eliminar un usuario. Esta acción no se puede deshacer.",
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
            await api.delete(`/users/${id}`);
            getUsers();
            Swal.fire({
              icon: "success",
              title: "¡Listo!",
              text: "Usuario eliminado correctamente ♻",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Algo salió mal!",
            text: "No se pudo eliminar el usuario.",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
        text: "No se pudo eliminar el usuario.",
      });
    }
  }

  return (
    <>
      <div className="admin-users-container">
        <div className="add-btn-container">
          <button onClick={handleShow}>+ Agregar</button>
        </div>
        <div className="table-container">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Fecha de nacimiento</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="td-avatar">
                    <img
                      className="user-avatar"
                      src={
                        user.image
                          ? user.image
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={user.fullName}
                    />
                  </td>
                  <td className="td-name">{user.fullName}</td>
                  <td className="td-email">{user.email}</td>
                  <td className="td-date">{user.bornDate}</td>
                  <td className="td-phone">{user.phone}</td>
                  <td className="td-actions">
                    <button
                      className="td-button-edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="td-button-delete"
                      onClick={() => {
                        deleteUser(user._id);
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
                <td colSpan="6">Panel de administración de usuarios</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        title={isEditing ? "Editar usuario" : "Agregar usuario"}
      >
        {" "}
        {/* Llamo al modal */}
        <>
          <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <div className="input-group">
              <label htmlFor="fullName" className="form-label">
                Nombre Completo
              </label>
              <input
                type="text"
                className="form-control"
                {...register("fullName", {
                  required: true,
                  minLength: 3,
                  maxLength: 100,
                })}
              />
              {errors.name?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}

              {(errors.name?.type === "minLength" ||
                errors.name?.type === "maxLength") && (
                <span className="input-error">
                  La cantidad de caracteres es invalida
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                {...register("email", {
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                })}
                name="email"
                id="email"
                placeholder="Ingrese su email"
              />
              {errors.email?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="input-error">Ingrese un email válido</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="email">Contraseña</label>
              <input
                type="password"
                className="form-control"
                {...register("password", {
                  required: true,
                  minLength: 4,
                })}
                name="password"
                id="password"
                placeholder="Ingrese su contraseña"
              />
              {errors.email?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="input-error">
                  Ingrese una contraseña válida
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="birth-date"> Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                {...register("bornDate", { required: true })}
              />
              {errors.bornDate?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="number"
                className="form-control"
                {...register("phone", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                })}
              />
              {errors.lastname?.type === "required" && (
                <span className="input-error">El campo es requerido</span>
              )}

              {(errors.lastname?.type === "minLength" ||
                errors.lastname?.type === "maxLength") && (
                <span className="input-error">
                  La cantidad de caracteres es invalida
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                {...register("image")}
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
