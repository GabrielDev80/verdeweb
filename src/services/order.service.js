import { api } from "../api/axios.js";

export const createOrder = async (data) => {
  const response = await api.post("orders", data);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getUserOrders = async () => {
  const { data } = await api.get("/orders");

  return data.payload;
};
