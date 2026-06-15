import { useState } from "react";
import { NavLink } from "react-router-dom";

import "../../styles/custom.scss";
import "../../styles/navbar.scss";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* ==================== Logo ==================== */}
        <div className="navbarBrand">
          <NavLink to="/" onClick={closeMenu}>
            <img
              className="brand-image"
              src="/logo.svg"
              alt="Logo de Verde Web"
            />
          </NavLink>
        </div>
        {/* ============== Menú Hamburguesa ============== */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            console.log("menu open: ", !menuOpen);
          }}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
        {/* ==================== Menú ==================== */}
        <ul className={`navbarList ${menuOpen ? "active" : ""}`}>
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/us" className="navbarLink" onClick={closeMenu}>
              Quienes Somos
            </NavLink>
          </li>
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/products" className="navbarLink" onClick={closeMenu}>
              Productos
            </NavLink>
          </li>
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/faqs" className="navbarLink" onClick={closeMenu}>
              Preguntas Frecuentes
            </NavLink>
          </li>
          {/* cta whatsapp */}
          <li className="navbarItem font-primary extra-bold">
            <NavLink to="/contact" className="navbarLink" onClick={closeMenu}>
              Contactanos
            </NavLink>
          </li>
          {/* formato carrito con numero de productos */}
          <li className="navbarItem font-primary extra-bold ">
            <NavLink to="/cart" className="navbarLink" onClick={closeMenu}>
              Carrito
            </NavLink>
          </li>
          {/* Formato boton-pill */}
          <li className="navbarItem font-primary extra-bold">
            <NavLink
              to="/login"
              className="navbarLink loginButton"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
