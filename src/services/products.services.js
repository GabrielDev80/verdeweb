import { api } from "../api/axios.js";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/products");
    if (!data) {
      console.error("getProducts: No hay productos para mostrar");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
