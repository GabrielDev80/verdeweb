import { api } from "../api/axios.js";

const BASE_URL = "/carts";

export const getCart = async () => {
  const { data } = await api.get(BASE_URL);

  return data.payload;
};

export const addProduct = async (productId, quantity) => {
  const { data } = await api.post(`${BASE_URL}/products`, {
    productId,
    quantity,
  });

  return data.payload;
};

export const updateProductQuantity = async (productId, quantity) => {
  const { data } = await api.patch(`${BASE_URL}/products/${productId}`, {
    quantity,
  });

  return data.payload;
};

export const removeProduct = async (productId) => {
  const { data } = await api.delete(`${BASE_URL}/products/${productId}`);

  return data.payload;
};

export const clearCart = async () => {
  await api.delete(BASE_URL);
};
