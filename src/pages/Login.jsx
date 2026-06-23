import LoginForm from "../components/forms/LoginForm.jsx";
import { login as loginService } from "../services/auth.services.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import "sweetalert2/themes/bulma.css";
import "../styles/custom.scss";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (formData) => {
    try {
      const response = await loginService(formData);

      if (response.status !== "success") {
        return;
      }

      authLogin(response.payload.user, response.payload.token);

      await Swal.fire({
        icon: "success",
        title: response.message,
        text: "Inicio de sesión exitoso",
        timer: 3000,
        showConfirmButton: false,
        position: "top-end",
      });

      navigate("/");
    } catch (error) {
      await Swal.fire({
        theme: "bulma",
        icon: "error",
        title: "Error al iniciar sesión",
        text: error.response?.data?.message || "Ocurrió un error inesperado.",
        width: "600px",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Cerrar",
        cancelButtonColor: "#dc3545",
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
    }
  };
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Modo Huerta Online - Ingresar</title>
      </Helmet>
      {/* Body */}
      <div className="container-lg">
        <p className="mb-3 info">Por favor, inicia sesión para continuar...</p>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </>
  );
};

export default Login;
