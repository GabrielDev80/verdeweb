import { toast } from "react-toastify";

export const showSuccess = (message, options = {}) =>
  toast.success(message, options);

export const showError = (message, options = {}) =>
  toast.error(message, { autoClose: 2500, ...options });

export const showInfo = (message, options = {}) => toast.info(message, options);

export const showWarning = (message, options = {}) =>
  toast.warning(message, options);

export const dismissToast = () => toast.dismiss();
