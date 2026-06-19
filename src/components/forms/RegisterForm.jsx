import "../../styles/forms.scss";
import { useState } from "react";
import {
  emailRegex,
  passwordValidations,
} from "../../utils/validations/validations.js";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button.jsx";

export const RegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const password = form.password;

  const validatePassword = {
    minLength: passwordValidations.minLength(password),
    hasUppercase: passwordValidations.hasUppercase(password),
    hasLowercase: passwordValidations.hasLowercase(password),
    hasNumber: passwordValidations.hasNumber(password),
  };

  const isEmailValid = emailRegex.test(form.email);

  const isPasswordValid =
    validatePassword.minLength &&
    validatePassword.hasLowercase &&
    validatePassword.hasUppercase &&
    validatePassword.hasNumber;

  const showPasswordRules = form.password.length > 0;

  const passwordsMatch = form.password === form.confirmPassword;

  const isFormValid =
    form.username.trim() !== "" &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Inputs */}
        <div className="input-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            value={form.username.trim()}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="on"
            minLength={3}
            required
            placeholder="Nombre para tu cuenta"
          />
        </div>
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
            onBlur={handleBlur}
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
              onBlur={handleBlur}
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Contraseña</label>
          <div className="password-group">
            <input
              className="input"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="on"
              minLength={8}
              required
              placeholder="confirma tu contraseña"
            />
            <img
              className="icon"
              src={`/icons/forms/${showConfirmPassword ? "icons8-eye-50.png" : "icons8-closed-eye-50.png"}`}
              alt={`ícono de ${showConfirmPassword ? "mostrar" : "ocultar"} password`}
              onClick={handleShowConfirmPassword}
            />
          </div>
        </div>

        {/* Conditionals messages */}
        {touched.email && form.email && !isEmailValid && (
          <div className="email-message">
            <p className="invalid">Email inválido</p>
          </div>
        )}
        {showPasswordRules && (
          <div className="password-rules">
            <p className={validatePassword.hasUppercase ? "valid" : "invalid"}>
              ✔ Al menos 1 letra mayúscula
            </p>
            <p className={validatePassword.hasLowercase ? "valid" : "invalid"}>
              ✔ Al menos 1 letra minúscula
            </p>
            <p className={validatePassword.hasNumber ? "valid" : "invalid"}>
              ✔ Al menos 1 número
            </p>
            <p className={validatePassword.minLength ? "valid" : "invalid"}>
              ✔ Mínimo 8 caracteres
            </p>
          </div>
        )}
        {touched.confirmPassword && form.confirmPassword && !passwordsMatch && (
          <div className="confirm-password-message">
            <p className="invalid">Las contraseñas no coinciden</p>
          </div>
        )}

        {/* Button */}
        <Button
          className="btn btn-success btn-pill"
          type="submit"
          disabled={!isFormValid}
          text="Registrarse"
        />
      </form>

      <p className="info">
        ¿Ya tienes cuenta? <Link to="/login">Ve a iniciar sesión.</Link>
      </p>
    </div>
  );
};
