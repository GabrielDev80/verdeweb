import "../../styles/forms.scss";
import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { Link } from "react-router-dom";
import {
  emailRegex,
  passwordValidations,
} from "../../utils/validations/validations.js";

const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleBlur = (e) => {
  //   setTouched((prev) => ({
  //     ...prev,
  //     [e.target.name]: true,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const { email, password } = form;

  const validatePassword = {
    minLength: passwordValidations.minLength(password),
    hasUppercase: passwordValidations.hasUppercase(password),
    hasLowercase: passwordValidations.hasLowercase(password),
    hasNumber: passwordValidations.hasNumber(password),
  };

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid =
    validatePassword.minLength &&
    validatePassword.hasLowercase &&
    validatePassword.hasUppercase &&
    validatePassword.hasNumber;

  const isFormValid = isEmailValid && isPasswordValid;

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
            value={form.email.trim().toLowerCase()}
            onChange={handleChange}
            // onBlur={handleBlur}
            autoComplete="on"
            required
            placeholder="ingresa tu email"
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <div className="password-group">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              // onBlur={handleBlur}
              autoComplete="on"
              minLength={8}
              required
              placeholder="ingresa tu contraseña"
            />
            <img
              className="icon"
              src={`/icons/forms/${showPassword ? "icons8-eye-50.png" : "icons8-closed-eye-50.png"}`}
              alt={`ícono de ${showPassword ? "mostrar" : "ocultar"} password`}
              onClick={handleShowPassword}
            />
          </div>
        </div>
        <Button
          className="btn btn-success btn-pill"
          type="Submit"
          disabled={!isFormValid}
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
