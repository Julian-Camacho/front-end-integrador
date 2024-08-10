import "./Register.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "https://6622ed3e3e17a3ac846e404e.mockapi.io/api";

export default function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    if (data.password !== data.repeatPassword) {
      Swal.fire({
        title: "¡Lo sentimos!",
        text: "Las contraseñas ingresadas no coinciden",
        icon: "error",
      });
      reset();
      return;
    }

    const usr = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      bornDate: new Date(data.bornDate).getTime(),
      phone: data.phone,
    };

    registerUser(usr);
  }

  async function registerUser(user) {
    try {
      await axios.post(`${baseUrl}/users`, user);
      Swal.fire({
        title: "¡Bienvenido/a!",
        text: "Usuario registrado correctamente",
        icon: "success",
        confirmButtonColor: "#2b285b",
      });
      reset();
    } catch (error) {
      Swal.fire({
        title: "¡Lo sentimos!",
        text: "No se pudo procesar el registro.",
        icon: "error",
      });
    }
  }

  return (
    <div className="main-con">
        <div className="register-container">
      <h1 className="register-title">Registro</h1>
      <form
        className="form-register-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-group">
          <label htmlFor="fullName">Nombre Completo</label>
          <input
            type="text"
            {...register("fullName", {
              required: true,
              minLength: 3,
              maxLength: 15,
            })}
            name="fullName"
            id="fullName"
            placeholder="Ingrese su nombre"
          />
          {errors.name?.type === "required" && (
            <span className="input-error">El campo es requerido</span>
          )}

          {(errors.name?.type === "minLength" ||
            errors.name?.type === "maxLength") && (
            <span className="input-error">
              La cantidad de caracteres es inválida
            </span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            })}
            name="email"
            id="email"
            placeholder="Ingrese su email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Telefono</label>
          <input
            type="number"
            {...register("phone", {
              required: true,
              minLength: 3,
              maxLength: 15,
            })}
            name="phone"
            id="phone"
            placeholder="Ingrese su telefono"
          />
          {errors.lastname?.type === "required" && (
            <span className="input-error">El campo es requerido</span>
          )}

          {(errors.lastname?.type === "minLength" ||
            errors.lastname?.type === "maxLength") && (
            <span className="input-error">
              La cantidad de caracteres es inválida
            </span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="birth-date"> Fecha de nacimiento</label>
          <input type="date" {...register("bornDate", { required: true })} />
          {errors.bornDate?.type === "required" && (
            <span className="input-error">El campo es requerido</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 30,
            })}
            name="password"
            id="password"
            placeholder="Contraseña"
          />
          {errors.password?.type === "required" && (
            <span className="input-error">El campo es requerido</span>
          )}
          {(errors.password?.type === "minLength" ||
            errors.password?.type === "maxLength") && (
            <span className="input-error">
              La cantidad de caracteres es inválida
            </span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="repeatPassword">Repetir Contraseña</label>
          <input
            type="password"
            {...register("repeatPassword", {
              required: true,
              minLength: 4,
              maxLength: 30,
            })}
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Repetir contraseña"
          />

          {errors.password?.type === "required" && (
            <span className="input-error">El campo es requerido</span>
          )}
          {(errors.repeatPassword?.type === "minLength" ||
            errors.repeatPassword?.type === "maxLength") && (
            <span className="input-error">
              La cantidad de caracteres es inválida
            </span>
          )}
        </div>
        <button type="submit" className="form-button">
          Registrarme
        </button>
      </form>
    </div>
    </div>
  );
}
