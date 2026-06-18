import { register } from "../services/auth.services.js";
import { RegisterForm } from "../components/forms/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

import "../styles/custom.scss";

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const handleRegister = async (formData) => {
    try {
      const response = await register(formData);

      console.info("Register Response: ", response.message);
      //* Agregar un Sweet Alert
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);
      setServerError(error.response?.data?.message || "Ocurrió un error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Verde Web Online - Registro</title>
      </Helmet>
      <div className="container-lg">
        <p className="info">Por favor, registrate para continuar...</p>
        <RegisterForm onSubmit={handleRegister} />
        {/* {serverError && <p className="error">{serverError}</p>} */}
        {serverError && alert(serverError)}
      </div>
    </>
  );
};

export default Register;
