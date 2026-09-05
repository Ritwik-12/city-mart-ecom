const images = {
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  shoe: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  perfume: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
  phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
};

export const getFallbackProductImage = (product) => {
  const text = `${product?.productName || ""} ${product?.description || ""}`.toLowerCase();

  if (text.includes("headphone") || text.includes("speaker") || text.includes("audio")) return images.headphones;
  if (text.includes("watch")) return images.watch;
  if (text.includes("shoe") || text.includes("sneaker")) return images.shoe;
  if (text.includes("backpack") || text.includes("bag")) return images.backpack;
  if (text.includes("perfume")) return images.perfume;
  if (text.includes("phone") || text.includes("mobile")) return images.phone;

  return `${import.meta.env.BASE_URL}assets/images/product-placeholder.svg`;
};
