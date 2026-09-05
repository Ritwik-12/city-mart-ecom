import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementProduct,
  fetchCart,
  incrementProduct,
  removeProduct,
} from "../../store/slices/cartSlice";
import ProductImage from "../../components/common/ProductImage";
import { formatCurrency, getSpecialPrice } from "../../utils/product";
import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import { toast } from "sonner";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartId, products, totalPrice, loading } = useSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = Number(
    totalPrice ||
      products.reduce(
        (sum, p) => sum + getSpecialPrice(p) * Number(p.quantity || 1),
        0,
      ),
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  const total = subtotal + shipping;

  const hasUnavailableItems = products.some((product) => {
    const qty = Number(product.quantity ?? 0);
    const availableQuantity = Number(product.availableQuantity ?? 0);

    return qty > availableQuantity;
  });

  const action = async (promise, success) => {
    try {
      await dispatch(promise).unwrap();

      if (success) {
        toast.success(success);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Cart update failed.");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Shopping cart"
        title="Your Cart"
        description="Review your items before moving to checkout."
      />

      <section className="container-page py-8 sm:py-10">
        {loading && products.length === 0 ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Add something you love and it will appear here."
            action={
              <Link to="/shop">
                <Button>Continue shopping</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
            {/* CART PRODUCTS */}

            <div className="space-y-3">
              {products.map((product) => {
                const qty = Number(product.quantity ?? 1);

                const availableQuantity = Number(
                  product.availableQuantity ?? 0,
                );

                const isOutOfStock = availableQuantity <= 0;

                const isQuantityExceeded = qty > availableQuantity;

                const price = getSpecialPrice(product);

                return (
                  <div
                    key={product.productId}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-5"
                  >
                    <Link
                      to={`/products/${product.productId}`}
                      className="h-24 w-24 shrink-0 rounded-xl bg-gray-50 p-2 dark:bg-gray-800 sm:h-32 sm:w-32"
                    >
                      <ProductImage product={product} />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          to={`/products/${product.productId}`}
                          className="line-clamp-2 text-sm font-bold text-gray-900 transition hover:text-purple-600 dark:text-white dark:hover:text-purple-400 sm:text-base"
                        >
                          {product.productName}
                        </Link>

                        <button
                          onClick={() =>
                            action(
                              removeProduct({
                                cartId,
                                productId: product.productId,
                              }),
                              "Removed from cart",
                            )
                          }
                          className="text-gray-400 transition hover:text-red-500 dark:text-gray-500"
                          aria-label="Remove product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        ₹{price.toFixed(0)} each
                      </p>

                      {/* STOCK STATUS */}

                      {isOutOfStock && (
                        <p className="mt-2 text-xs font-semibold text-red-500">
                          This product is now out of stock
                        </p>
                      )}

                      {!isOutOfStock && isQuantityExceeded && (
                        <p className="mt-2 text-xs font-semibold text-red-500">
                          Only {availableQuantity} items are currently
                          available.
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between">
                        {/* QUANTITY */}

                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                          <button
                            disabled={loading}
                            onClick={() =>
                              qty <= 1
                                ? action(
                                    removeProduct({
                                      cartId,
                                      productId: product.productId,
                                    }),
                                  )
                                : action(decrementProduct(product.productId))
                            }
                            className="p-2.5 text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-9 text-center text-sm font-semibold text-gray-900 dark:text-white">
                            {qty}
                          </span>

                          <button
                            disabled={
                              loading ||
                              isOutOfStock ||
                              qty >= availableQuantity
                            }
                            onClick={() =>
                              action(incrementProduct(product.productId))
                            }
                            className="p-2.5 text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-800"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <strong className="text-sm text-gray-950 dark:text-white sm:text-base">
                          {formatCurrency(price * qty)}
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}

            <aside className="h-fit rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-800 sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                Order summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping ? formatCurrency(shipping) : "Free"}</span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-4 font-bold text-gray-950 dark:border-gray-700 dark:text-white">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {hasUnavailableItems ? (
                <div className="mt-6">
                  <Button
                    disabled
                    className="w-full cursor-not-allowed opacity-50"
                  >
                    Checkout <ArrowRight size={17} />
                  </Button>

                  <p className="mt-3 text-center text-xs font-medium text-red-500">
                    Remove or update unavailable items before checkout.
                  </p>
                </div>
              ) : (
                <Link to="/checkout" className="mt-6 block">
                  <Button className="w-full">
                    Checkout <ArrowRight size={17} />
                  </Button>
                </Link>
              )}
            </aside>
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;