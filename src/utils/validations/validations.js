export const passwordValidations = {
  minLength: (password) => password.length >= 8,
  hasUppercase: (password) => /[A-Z]/.test(password),
  hasLowercase: (password) => /[a-z]/.test(password),
  hasNumber: (password) => /[0-9]/.test(password),
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => emailRegex.test(email);
