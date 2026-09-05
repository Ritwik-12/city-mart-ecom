import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = ({ onSuccess }) => {
  const { clientSecret, isLoading, errorMessage } = useSelector(
    (state) => state.stripe,
  );
  const { totalPrice } = useSelector((state) => state.cart);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
        {errorMessage}
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm
        clientSecret={clientSecret}
        totalPrice={totalPrice}
        onSuccess={onSuccess}
      />
    </Elements>
  );
};

export default StripePayment;
