import { useAuth } from "../../hooks/useAuth.js";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CartIcon } from "../ui/CartIcon.jsx";
import { useCart } from "../../hooks/useCart.js";

import "../../styles/custom.scss";
import "../../styles/navbar.scss";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const { cartCount } = useCart();
  // const cartCount = cartItems.length;

  return (
    <>
      <nav className="navbar">
        {/* ==================== Logo ==================== */}
        <div className="navbarBrand">
          <NavLink to="/" onClick={closeMenu}>
            <img
              className="brand-image"
              src="logo/logo.svg"
              alt="Logo de Modo Huerta"
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
            <NavLink to="/about" className="navbarLink" onClick={closeMenu}>
              Nosotros
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
          {/* Carrito con numero de productos */}
          <li className="navbarItem font-primary extra-bold ">
            <NavLink
              to="/cart"
              className="navbarLink cartLink"
              onClick={closeMenu}
            >
              <CartIcon className="cartIcon" />
              {cartCount > 0 && (
                <span className="cartBadge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </NavLink>
          </li>
          {/* Formato boton-pill */}
          <li className="navbarItem font-primary extra-bold">
            {isAuthenticated ? (
              <NavLink to="/account" className="navbarLink" onClick={closeMenu}>
                <span>👤 Mi cuenta</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="navbarLink loginButton"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
