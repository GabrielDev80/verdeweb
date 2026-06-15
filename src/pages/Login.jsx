import LoginForm from "../components/forms/LoginForm.jsx";
import { login as loginService } from "../services/auth.services.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Helmet } from "react-helmet-async";

import "../styles/custom.scss";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (formData) => {
    try {
      const response = await loginService(formData);

      if (response.status !== "success") {
        console.warn("Login Response: ", response);
        return;
      }

      // console.info("Login Response: ", response);
      authLogin(response.payload.user, response.payload.token);

      //TODO: Agregar un Sweet Alert
      // await Swal.fire({
      //   icon: "success",
      //   title: "Bienvenido",
      //   text: `Hola ${response.payload.user.username}`,
      //   timer: 1500,
      //   showConfirmButton: false,
      // });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* Head */}
      <Helmet>
        <title>Verde Web Online - Ingresar</title>
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
