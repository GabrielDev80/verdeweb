import { register } from "../services/auth.services.js";
import { RegisterForm } from "../components/forms/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/custom.scss";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async (formData) => {
    try {
      const response = await register(formData);
      console.info("Register Response: ", response);
      //* Agregar un Sweet Alert
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
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
      </div>
    </>
  );
};

export default Register;
