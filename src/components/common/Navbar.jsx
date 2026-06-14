import { NavLink } from "react-router-dom";
import "../../styles/custom.scss";
import "../../styles/navbar.scss";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbarBrand">
          <NavLink to="/">
            <img
              className="brand-image"
              src="/logo.svg"
              alt="Logo de Verde Web"
            />
          </NavLink>
        </div>
        {/* ============================================= */}
        <ul className="navbarList">
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/us" className="navbarLink">
              Quienes Somos
            </NavLink>
          </li>
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/products" className="navbarLink">
              Productos
            </NavLink>
          </li>
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/faqs" className="navbarLink">
              Preguntas Frecuentes
            </NavLink>
          </li>
          {/* cta whatsapp */}
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/contact" className="navbarLink">
              Contactanos
            </NavLink>
          </li>
          {/* formato carrito con numero de productos */}
          <li className="navbarItem font-primary extra-bold ">
            <NavLink to="/cart" className="navbarLink">
              Carrito
            </NavLink>
          </li>
          {/* Formato boton-pill */}
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/login" className="navbarLink">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
