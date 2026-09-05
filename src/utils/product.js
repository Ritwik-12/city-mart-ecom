export const getSpecialPrice = (product) => {
  if (!product) return 0;
  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);
  return Math.max(0, price - (price * discount) / 100);
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const getDiscountLabel = (discount) =>
  Number(discount) > 0 ? `${Math.round(Number(discount))}% OFF` : null;

export const getProductImage = (product) => {
  if (!product?.image) {
    return `${import.meta.env.BASE_URL}assets/images/product-placeholder.svg`;
  }

  // If backend already sends a complete URL
  if (product.image.startsWith("http")) {
    return product.image;
  }

  // Backend sends only the filename
  return `http://localhost:9090/images/${product.image}`;
};
