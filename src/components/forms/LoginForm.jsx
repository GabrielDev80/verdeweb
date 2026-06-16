import "../../styles/forms.scss";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          className="btn btn-success btn-pill"
          type="Submit"
          text="Login"
        />
      </form>

      <p className="info">
        {/* Debe enviar un mail para restablecer la contraseña */}
        <Link to="#">Olvidé mi contraseña 🤦🏼</Link>
      </p>

      <p className="info">
        ¿Aún no tienes cuenta? <Link to="/register">Regístrate aquí.</Link>
      </p>
    </div>
  );
};

export default LoginForm;
