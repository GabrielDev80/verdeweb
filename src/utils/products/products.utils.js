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

export const normalizeQuantity = (quantity, salesUnit) => {
  const parsed = Number(quantity);
  console.log("salesUnit:", salesUnit);
  console.log("parsed:", parsed);

  if (Number.isNaN(parsed)) {
    return salesUnit === "Kg" ? 0.25 : 1;
  }

  if (salesUnit === "Kg") {
    // redondear a múltiplos de 0.25
    const step = 0.25;
    const normalized = Math.round(parsed / step) * step;
    return Math.max(step, Number(normalized.toFixed(2)));
  }

  // productos por unidad
  return Math.max(1, Math.round(parsed));
};
