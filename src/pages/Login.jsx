import LoginForm from "../components/forms/LoginForm.jsx";
import { login } from "../services/auth.services.js";
import { useNavigate } from "react-router-dom";
import "../styles/custom.scss";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      if (!response) {
        console.warn("Login Response: ", response);

        return;
      }
      console.info("Login Response: ", response.status);
      //* Agregar un Sweet Alert

      localStorage.setItem("token", response.payload.token);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Verde Web Online - Ingresar</title>
      </Helmet>
      <div className="container-lg">
        <p className="mb-3 info">Por favor, inicia sesión para continuar...</p>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </>
  );
};

export default Login;
