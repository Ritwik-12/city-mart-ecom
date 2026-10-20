import { useEffect, useState } from "react";
import { Check, CreditCard, MapPin, Plus, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../services/addressService";
import { placeOrder, createRazorpayOrder } from "../../services/orderService";
import { clearCart } from "../../store/slices/cartSlice";
import { fetchClientSecret, clearClientSecret } from "../../store/slices/stripeSlice";
import { formatCurrency } from "../../utils/product";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import PageHeader from "../../components/common/PageHeader";
import StripePayment from "../../components/payment/StripePayment";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, totalPrice } = useSelector((state) => state.cart);

  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    getUserAddresses()
      .then((data) => {
        setAddresses(data || []);

        if (data?.length) {
          setAddressId(String(data[0].id));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch a fresh Stripe PaymentIntent whenever the shopper switches to
  // online payment (or the cart total changes while it's selected).
  useEffect(() => {
    if (paymentMethod !== "ONLINE") {
      dispatch(clearClientSecret());
      return;
    }

    if (!totalPrice) return;

    // Stripe expects the amount in the smallest currency unit (paise for INR).
    dispatch(fetchClientSecret({ amount: Math.round(totalPrice * 100), currency: "inr" }));
  }, [paymentMethod, totalPrice, dispatch]);

  const submitOrder = async ({ pgName, pgPaymentId, pgStatus, pgResponseMessage ,pgOrderId, pgSignature }) => {
    if (!addressId) {
      toast.error("Please select a shipping address.");
      return;
    }

    if (!products.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setPlacing(true);

    try {
      const order = await placeOrder(paymentMethod, {
        addressId: Number(addressId),
        paymentMethod,
        pgName,
        pgPaymentId,
        pgStatus,
        pgResponseMessage,
        pgOrderId,
        pgSignature,
      });

      dispatch(clearCart());
      dispatch(clearClientSecret());

      navigate("/order-success", {
        state: { order },
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to place your order.",
      );
    } finally {
      setPlacing(false);
    }
  };

  // COD places the order immediately.
  const submitCod = () =>
    submitOrder({
      pgName: "Cash on Delivery",
      pgPaymentId: "",
      pgStatus: "PENDING",
      pgResponseMessage: "",
    });


    const payWithRazorpay = async () => {
  if (!addressId) {
    toast.error("Please select a shipping address.");
    return;
  }
  if (!products.length) {
    toast.error("Your cart is empty.");
    return;
  }
  if (!window.Razorpay) {
    toast.error("Razorpay failed to load. Refresh and try again.");
    return;
  }

  setPlacing(true);
  try {
    // Amount is computed from the cart on the server, never sent from here.
    const rzp = await createRazorpayOrder();

    const checkout = new window.Razorpay({
      key: rzp.keyId,
      amount: rzp.amount,
      currency: rzp.currency,
      order_id: rzp.razorpayOrderId,
      name: "Ecom",
      description: "Order payment",
      theme: { color: "#7c3aed" },
      handler: (response) =>
        // The backend re-verifies the signature and payment before creating the order.
        submitOrder({
          pgName: "Razorpay",
          pgPaymentId: response.razorpay_payment_id,
          pgOrderId: response.razorpay_order_id,
          pgSignature: response.razorpay_signature,
          pgStatus: "PENDING",
          pgResponseMessage: "Payment confirmed via Razorpay",
        }),
      modal: { ondismiss: () => setPlacing(false) },
    });

    checkout.on("payment.failed", (resp) => {
      toast.error(resp?.error?.description || "Payment failed. Please try again.");
      setPlacing(false);
    });

    checkout.open();
  } catch (error) {
    toast.error(error?.response?.data?.message || "Unable to start payment.");
    setPlacing(false);
  }
};

  // Called by PaymentForm once Stripe confirms the charge succeeded.
  // The backend independently re-verifies this PaymentIntent with Stripe
  // before it will create the order, so this is just the trigger.
  const handleStripeSuccess = (paymentIntent) =>
    submitOrder({
      pgName: "Stripe",
      pgPaymentId: paymentIntent.id,
      pgStatus: paymentIntent.status,
      pgResponseMessage: "Payment confirmed via Stripe",
    });

  const subtotal = Number(totalPrice || 0);

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Complete your order"
        description="Choose your delivery address and payment method."
      />

      <section className="container-page py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1fr_360px]">
            {/* LEFT SIDE */}

            <div className="space-y-5">
              {/* DELIVERY ADDRESS */}

              <div className="rounded-2xl border border-gray-100 bg-white p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-base font-bold text-gray-950 dark:text-white">
                    <MapPin
                      size={19}
                      className="text-purple-600 dark:text-purple-400"
                    />
                    Delivery address
                  </h2>

                  <Link
                    to="/addresses"
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    <Plus size={14} />
                    Add
                  </Link>
                </div>

                {addresses.length === 0 ? (
                  <div className="mt-5 rounded-xl bg-gray-50 p-5 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    No address found.{" "}
                    <Link
                      to="/addresses"
                      className="font-semibold text-purple-600 dark:text-purple-400"
                    >
                      Add an address
                    </Link>{" "}
                    to continue.
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {addresses.map((address) => {
                      const selected =
                        String(address.id) === addressId;

                      return (
                        <label
                          key={address.id}
                          className={`cursor-pointer rounded-xl border p-4 transition ${
                            selected
                              ? "border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/40"
                              : "border-gray-200 hover:border-purple-200 dark:border-gray-700 dark:hover:border-purple-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={address.id}
                            checked={selected}
                            onChange={(e) =>
                              setAddressId(e.target.value)
                            }
                            className="sr-only"
                          />

                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${
                                selected
                                  ? "border-purple-600 bg-purple-600 text-white"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {selected && <Check size={12} />}
                            </span>

                            <div className="text-sm leading-6">
                              <p className="font-bold text-gray-900 dark:text-white">
                                {address.buildingName}
                              </p>

                              <p className="text-gray-500 dark:text-gray-400">
                                {address.street}, {address.city}
                              </p>

                              <p className="text-gray-500 dark:text-gray-400">
                                {address.state}, {address.country} -{" "}
                                {address.pincode}
                              </p>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD */}

              <div className="rounded-2xl border border-gray-100 bg-white p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-950 dark:text-white">
                  <CreditCard
                    size={19}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  Payment method
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
  ["COD", "Cash on Delivery"],
  ["ONLINE", "Pay online"],
  ["RAZORPAY", "Razorpay"],
].map(([value, label]) => {
                    const selected = paymentMethod === value;

                    {value === "COD"
  ? "Pay when your order arrives."
  : value === "RAZORPAY"
    ? "UPI, cards and netbanking via Razorpay."
    : "Cards, UPI, and more via Stripe."}

                    return (
                      <label
                        key={value}
                        className={`cursor-pointer rounded-xl border p-4 transition ${
                          selected
                            ? "border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/40"
                            : "border-gray-200 hover:border-purple-200 dark:border-gray-700 dark:hover:border-purple-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={value}
                          checked={selected}
                          onChange={(e) =>
                            setPaymentMethod(e.target.value)
                          }
                          className="sr-only"
                        />

                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {label}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {value === "COD"
                            ? "Pay when your order arrives."
                            : "Cards, UPI, and more via Stripe."}
                        </p>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* STRIPE PAYMENT FORM */}

              {paymentMethod === "ONLINE" && (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-gray-950 dark:text-white">
                    <CreditCard
                      size={19}
                      className="text-purple-600 dark:text-purple-400"
                    />
                    Card details
                  </h2>

                  <div className="mt-5">
                    <StripePayment onSuccess={handleStripeSuccess} />
                  </div>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY */}

            <aside className="h-fit rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-800 sm:p-6 lg:sticky lg:top-28">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950 dark:text-white">
                <ShoppingBag size={19} />
                Summary
              </h2>

              <div className="mt-5 space-y-3">
                {products.map((p) => (
                  <div
                    key={p.productId}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="line-clamp-1 text-gray-500 dark:text-gray-400">
                      {p.productName} × {p.quantity || 1}
                    </span>

                    <span className="shrink-0 font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(
                        Number(p.price || 0) *
                          (1 - Number(p.discount || 0) / 100) *
                          Number(p.quantity || 1),
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-between border-t border-gray-200 pt-5 font-bold text-gray-950 dark:border-gray-700 dark:text-white">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

             {/* <Button
                loading={placing}
                onClick={submitCod}
                className="mt-5 w-full"
                disabled={paymentMethod === "ONLINE"}
              >
                {paymentMethod === "ONLINE"
                  ? "Complete payment above"
                  : "Place Order"}
              </Button>  */}

              <Button
  loading={placing}
  onClick={paymentMethod === "RAZORPAY" ? payWithRazorpay : submitCod}
  className="mt-5 w-full"
  disabled={paymentMethod === "ONLINE"}
>
  {paymentMethod === "ONLINE"
    ? "Complete payment above"
    : paymentMethod === "RAZORPAY"
      ? `Pay ${formatCurrency(subtotal)}`
      : "Place Order"}
</Button>

              {paymentMethod === "ONLINE" && (
                <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                  Enter your card details on the left, then confirm payment
                  there to place your order.
                </p>
              )}
            </aside>
          </div>
        )}
      </section>
    </>
  );
};

export default Checkout;