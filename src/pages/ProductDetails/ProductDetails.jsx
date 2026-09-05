import { useEffect, useMemo, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductImage from "../../components/common/ProductImage";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import ErrorState from "../../components/common/ErrorState";
import { formatCurrency, getSpecialPrice } from "../../utils/product";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/slices/cartSlice";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState("loading");

  const load = () => {
    setState("loading");

    getProducts({
      pageSize: 50,
      sortBy: "productId",
      sortOrder: "asc",
    })
      .then((data) => {
        const found = data?.content?.find(
          (item) => String(item.productId) === String(id),
        );

        setProduct(found || null);
        setState(found ? "ready" : "empty");
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    load();
  }, [id]);

  const specialPrice = useMemo(() => getSpecialPrice(product), [product]);

  const isOutOfStock = Number(product?.quantity || 0) <= 0;

  const add = async () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    if (!user) {
      toast.info("Please sign in first.");
      return;
    }

    try {
      await dispatch(
        addProduct({
          productId: product.productId,
          quantity,
        }),
      ).unwrap();

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to add to cart.",
      );
    }
  };

  if (state === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="container-page py-16">
        <ErrorState
          message="Unable to load this product."
          onRetry={load}
        />
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="container-page py-16">
        <ErrorState
          message="Product not found."
          onRetry={load}
        />
      </div>
    );
  }

  return (
    <section className="container-page py-8 sm:py-12">

      {/* Breadcrumb */}

      <div className="mb-6 text-sm text-gray-400 dark:text-gray-500">
        <Link
          to="/shop"
          className="hover:text-purple-600 dark:hover:text-purple-400"
        >
          Shop
        </Link>{" "}
        /{" "}
        <span className="text-gray-500 dark:text-gray-400">
          {product.productName}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">

        {/* Product Image */}

        <div
          className="
            flex aspect-square max-h-162.5
            items-center justify-center
            rounded-3xl
            border border-gray-100
            bg-gray-50
            p-8 sm:p-14

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <ProductImage
            product={product}
            className="max-h-full"
          />
        </div>

        {/* Product Details */}

        <div className="flex flex-col justify-center">

          {/* Product Badge */}

          <span
            className="
              w-fit rounded-full
              bg-purple-50
              px-3 py-1
              text-xs font-bold
              text-purple-700

              dark:bg-purple-950
              dark:text-purple-300
            "
          >
            Ecom product
          </span>

          {/* Product Name */}

          <h1
            className="
              mt-4
              text-3xl font-black tracking-tight
              text-gray-950
              sm:text-4xl

              dark:text-white
            "
          >
            {product.productName}
          </h1>

          {/* Description */}

          <p
            className="
              mt-4
              text-sm leading-7
              text-gray-600
              sm:text-base

              dark:text-gray-400
            "
          >
            {product.description}
          </p>

          {/* Price */}

          <div className="mt-6 flex items-end gap-3">

            <span className="text-3xl font-black text-gray-950 dark:text-white">
              {formatCurrency(specialPrice)}
            </span>

            {Number(product.discount) > 0 && (
              <span className="pb-1 text-sm text-gray-400 line-through dark:text-gray-500">
                {formatCurrency(product.price)}
              </span>
            )}

          </div>

          {/* Discount */}

          {Number(product.discount) > 0 && (
            <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Save {Math.round(Number(product.discount))}%
            </p>
          )}

          {/* Stock Status */}

          <div className="mt-4">

            {isOutOfStock ? (
              <span
                className="
                  inline-flex rounded-full
                  bg-red-50 px-3 py-1
                  text-sm font-semibold
                  text-red-600

                  dark:bg-red-950/50
                  dark:text-red-400
                "
              >
                Out of Stock
              </span>
            ) : (
              <span
                className="
                  inline-flex rounded-full
                  bg-emerald-50 px-3 py-1
                  text-sm font-semibold
                  text-emerald-600

                  dark:bg-emerald-950/50
                  dark:text-emerald-400
                "
              >
                In Stock
              </span>
            )}

          </div>

          {/* Quantity */}

          <div className="mt-7 flex items-center gap-4">

            <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">
              Quantity
            </span>

            <div
              className={`
                flex items-center overflow-hidden
                rounded-xl
                border border-gray-200
                dark:border-gray-700
                dark:bg-gray-900

                ${isOutOfStock ? "opacity-50" : ""}
              `}
            >

              <button
                disabled={isOutOfStock}
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="
                  p-3
                  text-gray-700
                  hover:bg-gray-50

                  dark:text-gray-300
                  dark:hover:bg-gray-800

                  disabled:cursor-not-allowed
                "
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span className="w-10 text-center text-sm font-semibold text-gray-900 dark:text-white">
                {isOutOfStock ? 0 : quantity}
              </span>

              <button
                disabled={
                  isOutOfStock ||
                  quantity >= Number(product.quantity || 0)
                }
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(
                      Number(product.quantity || 0),
                      q + 1,
                    ),
                  )
                }
                className="
                  p-3
                  text-gray-700
                  hover:bg-gray-50

                  dark:text-gray-300
                  dark:hover:bg-gray-800

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>

            </div>

            {!isOutOfStock && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {product.quantity} available
              </span>
            )}

          </div>

          {/* Actions */}

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">

            <Button
              onClick={add}
              disabled={isOutOfStock}
              className="w-full"
            >
              <ShoppingCart size={18} />

              {isOutOfStock
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>

            <button
              onClick={() =>
                toast.info(
                  "Wishlist will be connected when the backend exposes a wishlist API.",
                )
              }
              className="
                flex h-11
                items-center justify-center
                rounded-xl
                border border-gray-200
                px-5
                text-gray-700
                hover:border-purple-200
                hover:text-purple-600

                dark:border-gray-700
                dark:text-gray-300
                dark:hover:border-purple-700
                dark:hover:text-purple-400
              "
              aria-label="Add to wishlist"
            >
              <Heart size={19} />
            </button>

          </div>

          {/* Benefits */}

          <div
            className="
              mt-8
              divide-y divide-gray-100
              rounded-2xl
              border border-gray-100

              dark:divide-gray-800
              dark:border-gray-800
              dark:bg-gray-900
            "
          >

            <div className="flex items-center gap-3 p-4 text-sm text-gray-700 dark:text-gray-300">
              <Truck size={19} className="text-purple-600 dark:text-purple-400" />
              Free shipping over ₹999
            </div>

            <div className="flex items-center gap-3 p-4 text-sm text-gray-700 dark:text-gray-300">
              <ShieldCheck
                size={19}
                className="text-purple-600 dark:text-purple-400"
              />
              Secure checkout
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;