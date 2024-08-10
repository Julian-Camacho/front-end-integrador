import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import Logo from "../../assets/Fondos/logo.png";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const burgerMenu = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 1024 && burgerMenu.current.checked) {
        // Si la pantalla es mayor a 1024px y el menú está abierto, lo cerramos
        burgerMenu.current.checked = false;
      }
    };

    const handleRouteChange = () => {
      burgerMenu.current.checked = true;
      burgerMenu.current.checked = false;
    };

    // Event listener para el resize de la ventana
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Deschequear el checkbox para el cambio de ruta
    handleRouteChange();
  }, [location]);

  const { toggleSidebarOrder, count } = useOrder();

  const { user, logout } = useUser();

  return (
    <header className="main-header">
      <input
        type="checkbox"
        className="check-menu"
        id="check-menu"
        ref={burgerMenu}
      />
      <label htmlFor="check-menu" className="burger-menu">
        <div className="burger-line"></div>
      </label>
      <NavLink to="/">
        <div className="header-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </NavLink>
      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <span>Inicio</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about-us" className="nav-link">
              <span>Sobre Nosotros</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              <span>Contacto</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              <span>Iniciar Sesión</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              <span>Registrarse</span>
            </NavLink>
          </li>
          {user?.role === "ADMIN_ROLE" && (
            <li className="nav-item">
              <NavLink to="/admin-users" className="nav-link">
                <span>Administrar Usuarios</span>
              </NavLink>
            </li>
          )}
          {user?.role === "ADMIN_ROLE" && (
            <li className="nav-item">
              <NavLink to="/admin-product" className="nav-link">
                <span>Administrar Productos</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="user-info">
        <div className="nav-item">
          {user ? (
            <NavLink className="nav-link" onClick={logout}>
              <span>Logout</span>
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-link">
              <span>Login</span>
            </NavLink>
          )}
        </div>
        {/* <NavLink to="/register" className="nav-link user-info">
          <div className="user-data">
            <div className="user-name">Julián Camacho</div>
            <img
              className="user-image"
              src="https://imgur.com/OyTz80z.jpg"
              alt="perfil"
            />
          </div>
        </NavLink> */}
        <div
          className={`user-cart-container ${count < 1 ? "" : "show-circle"}`}
          data-count={count}
        >
          <FontAwesomeIcon
            className="user-cart"
            icon={faCartShopping}
            onClick={() => toggleSidebarOrder()}
          />
        </div>
      </div>
    </header>
  );
}
