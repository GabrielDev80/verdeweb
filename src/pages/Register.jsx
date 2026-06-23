import { register } from "../services/auth.services.js";
import { RegisterForm } from "../components/forms/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import "sweetalert2/themes/bulma.css";
import "../styles/custom.scss";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async (formData) => {
    try {
      const response = await register(formData);

      console.info("Register Response: ", response.message);
      console.info("Register Response: ", response);

      await Swal.fire({
        theme: "bulma",
        icon: "success",
        title: "Registro exitoso",
        text: response.message,
        timer: 3000,
        showConfirmButton: false,
        position: "top-end",
      });
      navigate("/login");
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
      <Helmet>
        <title>Modo Huerta Online - Registro</title>
      </Helmet>
      <div className="container-lg">
        <p className="info">Por favor, registrate para continuar...</p>
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </>
  );
};

export default Register;
