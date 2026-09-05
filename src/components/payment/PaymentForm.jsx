import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Spinner from "../common/Spinner";
import { formatCurrency } from "../../utils/product";

const PaymentForm = ({ totalPrice, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet.
      return;
    }

    setLoading(true);
    setErrorMessage("");

    // redirect: "if_required" keeps the user on this page for payment
    // methods that don't need a redirect (e.g. cards), and only sends
    // them off-site for ones that do (e.g. UPI/wallets).
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
    });

    if (error) {
      setErrorMessage(
        error.message || "We couldn't process your payment. Please try again.",
      );
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // Let the parent (Checkout) create the order now that Stripe has
      // confirmed the charge. The backend independently re-verifies this
      // PaymentIntent before creating the order, so this is just the trigger.
      await onSuccess?.(paymentIntent);
    } else {
      setErrorMessage(
        `Payment status: ${paymentIntent?.status || "unknown"}. Please try again.`,
      );
    }

    setLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={paymentElementOptions} />

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Spinner size="sm" className="border-white border-t-transparent" />
            Processing
          </>
        ) : (
          `Pay ${formatCurrency(totalPrice)}`
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
