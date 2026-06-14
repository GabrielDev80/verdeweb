import "../../styles/forms.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";

export const RegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    username: "",
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
          <label htmlFor="username">Nombre de usuario</label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            autocomplete="on"
            minLength={3}
            required
            placeholder="Nombre para tu cuenta"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            autocomplete="on"
            required
            placeholder="ingresa tu email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            autocomplete="on"
            minLength={8}
            required
            placeholder="ingresa tu contraseña"
          />
        </div>
        <Button
          className="btn btn-success btn-pill"
          text="Registrarse"
          type="submit"
        />
        <p className="info">
          ¿Ya tienes cuenta? <Link to="/login">Ve a iniciar sesión.</Link>
        </p>
      </form>
    </div>
  );
};
