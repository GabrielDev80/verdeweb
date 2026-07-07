import { api } from "../api/axios.js";

export const createOrder = async (checkoutData) => {
  const { data } = await api.post("/orders", checkoutData);

  return data.payload;
};
