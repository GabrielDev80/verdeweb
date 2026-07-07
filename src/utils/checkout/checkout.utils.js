const ADDRESS_ABBREVIATIONS = {
  av: "Av.",
  bv: "Bv.",
  gral: "Gral.",
  pte: "Pte.",
  dr: "Dr.",
  ing: "Ing.",
  prof: "Prof.",
  sta: "Sta.",
  sto: "Sto.",
};

// Elimina espacios al inicio/final y reemplaza múltiples espacios por uno.
const cleanText = (value) => {
  if (!value) return "";

  return value.trim().replace(/\s+/g, " ");
};

// Elimina todo excepto números. "(011) 3046-2293" -> "01130462293"
const cleanPhone = (phone) => {
  if (!phone) return "";

  return phone.replace(/\D/g, "");
};

// Capitaliza cada palabra respetando acentos. "gAbRiEl nIcOlOsI" -> "Gabriel Nicolosi"
const capitalizeWords = (text) => {
  return cleanText(text)
    .toLowerCase()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
};

const normalizeAddress = (text = "") => {
  const words = capitalizeWords(text).split(" ");

  return words
    .map((word) => {
      const key = word.toLowerCase().replace(".", "");

      return ADDRESS_ABBREVIATIONS[key] || word;
    })
    .join(" ");
};

const cleanAddress = (address) => ({
  address_alias: capitalizeWords(address.address_alias),

  address: normalizeAddress(address.address),

  between_streets: normalizeAddress(address.between_streets),

  location: capitalizeWords(address.location),

  additional_data: cleanText(address.additional_data),
});

export const buildCheckoutDTO = (checkout) => {
  return {
    customer: {
      first_name: capitalizeWords(checkout.first_name),

      last_name: capitalizeWords(checkout.last_name),

      phone: cleanPhone(checkout.phone),
    },

    delivery: {
      type: checkout.delivery_type,
      address:
        checkout.delivery_type === "delivery" ? cleanAddress(checkout) : null,
    },

    payment: {
      method: checkout.payment_method,
      cash_amount:
        checkout.payment_method === "cash" && checkout.cash_amount !== ""
          ? Number(checkout.cash_amount)
          : null,
    },

    notes: cleanText(checkout.notes),
  };
};
