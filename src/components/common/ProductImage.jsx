import { useState } from "react";
import { getProductImage } from "../../utils/product";
import { getFallbackProductImage } from "../../utils/imageFallbacks";

const ProductImage = ({ product, className = "", alt }) => {
  const [stage, setStage] = useState(0);

  const sources = [
    getProductImage(product),
    getFallbackProductImage(product),
    `${import.meta.env.BASE_URL}assets/images/product-placeholder.svg`,
  ];

  const src = sources[Math.min(stage, sources.length - 1)];

  return (
    <img
      src={src}
      alt={alt || product?.productName || "Product"}
      loading="lazy"
      onError={() => setStage((current) => Math.min(current + 1, sources.length - 1))}
      className={`h-full w-full object-contain ${className}`}
    />
  );
};

export default ProductImage;
