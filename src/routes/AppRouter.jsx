import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Faqs from "../pages/Faqs.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Account from "../pages/Account.jsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
