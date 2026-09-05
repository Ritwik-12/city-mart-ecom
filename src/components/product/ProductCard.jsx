import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ProductImage from "../common/ProductImage";
import { addProduct } from "../../store/slices/cartSlice";
import { formatCurrency, getSpecialPrice } from "../../utils/product";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.cart);
  const [adding, setAdding] = useState(false);

  const specialPrice = getSpecialPrice(product);
  const discount = Number(product?.discount || 0);
  const isOutOfStock = Number(product?.quantity || 0) <= 0;

  const handleAdd = async () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    if (!user) {
      toast.info("Please sign in to add items to your cart.");
      return;
    }

    setAdding(true);

    try {
      await dispatch(
        addProduct({
          productId: product.productId,
          quantity: 1,
        }),
      ).unwrap();

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Could not add this product to your cart.",
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className="
        group relative flex min-w-0 flex-col overflow-hidden
        rounded-2xl
        border border-gray-100 bg-white
        transition duration-300
        hover:-translate-y-1
        hover:border-purple-100
        hover:shadow-xl
        hover:shadow-purple-100/30

        dark:border-gray-800
        dark:bg-gray-900
        dark:hover:border-purple-800
        dark:hover:shadow-purple-950/30
      "
    >
      {/* Product Image */}

      <div
        className="
          relative aspect-square overflow-hidden
          bg-gray-50 p-5 sm:p-7

          dark:bg-gray-800
        "
      >
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
            -{Math.round(discount)}%
          </span>
        )}

        {/* Wishlist */}

        <button
          type="button"
          aria-label={`Add ${product.productName} to wishlist`}
          className="
            absolute right-3 top-3 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full
            bg-white text-gray-600
            shadow-sm transition
            hover:text-purple-600

            dark:bg-gray-900
            dark:text-gray-300
            dark:hover:text-purple-400
          "
          onClick={() =>
            toast.info("Wishlist will be connected next.")
          }
        >
          <Heart size={17} />
        </button>

        <Link
          to={`/products/${product.productId}`}
          className="block h-full"
        >
          <ProductImage
            product={product}
            className="transition duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Information */}

      <div className="flex flex-1 flex-col p-4">

        <Link
          to={`/products/${product.productId}`}
          className="
            line-clamp-2 min-h-10
            text-sm font-semibold
            text-gray-900
            hover:text-purple-600

            dark:text-white
            dark:hover:text-purple-400
          "
        >
          {product.productName}
        </Link>

        <p
          className="
            mt-1 line-clamp-1
            text-xs text-gray-500

            dark:text-gray-400
          "
        >
          {product.description || "Quality product from Ecom"}
        </p>

        {/* Stock Status */}

        <div className="mt-2">
          {isOutOfStock ? (
            <span className="text-xs font-semibold text-red-500">
              Out of Stock
            </span>
          ) : (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              In Stock
            </span>
          )}
        </div>

        {/* Ratings */}

        <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Ratings will appear when the backend exposes review data.
        </div>

        {/* Pricing */}

        <div className="mt-2 flex items-baseline gap-2">

          <span className="text-base font-bold text-gray-950 dark:text-white">
            {formatCurrency(specialPrice)}
          </span>

          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through dark:text-gray-500">
              {formatCurrency(product.price)}
            </span>
          )}

        </div>

        {/* Add To Cart */}

        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock || adding || loading}
          className={`
            mt-4
            inline-flex min-h-10
            items-center justify-center gap-2
            rounded-xl border
            px-3 py-2
            text-xs font-semibold
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50

            ${
              isOutOfStock
                ? `
                  border-gray-200
                  bg-gray-100
                  text-gray-400

                  dark:border-gray-700
                  dark:bg-gray-800
                  dark:text-gray-500
                `
                : `
                  border-purple-300
                  text-purple-600
                  hover:bg-purple-600
                  hover:text-white

                  dark:border-purple-700
                  dark:text-purple-400
                  dark:hover:bg-purple-600
                  dark:hover:text-white
                `
            }
          `}
        >
          <ShoppingCart size={15} />

          {isOutOfStock
            ? "Out of Stock"
            : adding
              ? "Adding..."
              : "Add to Cart"}
        </button>

      </div>
    </article>
  );
};

export default ProductCard;