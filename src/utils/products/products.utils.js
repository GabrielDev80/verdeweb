export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-Ar", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatQuantityLabel = (qty, unit) => {
  if (unit === "Kg") {
    const formatted = Number.isInteger(qty)
      ? qty.toString()
      : qty.toFixed(2).replace(".", ",");

    return `${formatted} Kg`;
  }
  return `${qty} un.`;
};
