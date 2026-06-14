import { Link } from "react-router-dom";
import "../../styles/custom.scss";
import "../../styles/navbar.scss";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbarBrand">
          <Link to="/">
            <img
              className="brand-image"
              src="/logo.svg"
              alt="Logo de Verde Web"
            />
          </Link>
        </div>
        <ul className="navbarList">
          <li className="navbarItem font-primary extra-bold">
            <Link to="/us">Quienes Somos</Link>
          </li>
          <li className="navbarItem font-primary extra-bold">
            <Link to="/products">Productos</Link>
          </li>
          <li className="navbarItem font-primary extra-bold">
            <Link to="/faqs">Preguntas Frecuentes</Link>
          </li>
          {/* cta whatsapp */}
          <li className="navbarItem font-primary extra-bold">
            <Link to="/contact">Contactanos</Link>
          </li>
          {/* formato carrito con numero de productos */}
          <li className="navbarItem font-primary extra-bold ">
            <Link to="/cart">Carrito</Link>
          </li>
          {/* Formato boton-pill */}
          <li className="navbarItem font-primary extra-bold">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
