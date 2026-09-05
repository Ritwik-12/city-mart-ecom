import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import { formatCurrency } from "../../utils/product";

const OrderSuccess = () => {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <section className="container-page flex min-h-[65vh] items-center justify-center py-14">
      <div className="w-full max-w-2xl text-center">
        {/* SUCCESS ICON */}

        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          <CheckCircle2 size={34} />
        </span>

        {/* HEADING */}

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          Order confirmed
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
          Thanks for shopping with Ecom.
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400">
          Your order has been accepted. Keep the confirmation details below
          for reference.
        </p>

        {/* ORDER DETAILS */}

        {order && (
          <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-left transition-colors duration-300 dark:border-gray-800 dark:bg-gray-800">
            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Order ID
              </span>

              <p className="mt-1 font-bold text-gray-950 dark:text-white">
                #{order.orderId}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Status
              </span>

              <p className="mt-1 font-bold text-gray-950 dark:text-white">
                {order.orderStatus}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Total
              </span>

              <p className="mt-1 font-bold text-gray-950 dark:text-white">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Items
              </span>

              <p className="mt-1 font-bold text-gray-950 dark:text-white">
                {order.orderItems?.length || 0}
              </p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop">
            <Button>
              <ShoppingBag size={17} />
              Continue shopping
            </Button>
          </Link>

          <Link to="/">
            <Button variant="secondary">
              <Package size={17} />
              Back home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;