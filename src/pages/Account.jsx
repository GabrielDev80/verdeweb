import { Helmet } from "react-helmet-async";
import { useAuth } from "../hooks/useAuth.js";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";

const Account = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
    console.log("Salí de la cuenta...");
  };

  return (
    <>
      <Helmet>
        <title>Modo Huerta Online - Mi cuenta</title>
      </Helmet>
      <div className="container-lg">
        <h1>Mi cuenta</h1>

        <p>Usuario: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <Button
          className="btn btn-danger"
          onClick={handleLogout}
          text="Cerrar sesión"
        />
      </div>
    </>
  );
};
export default Account;
