import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  ["Free Shipping", "On orders over ₹999", Truck],
  ["Easy Returns", "7-day return policy", RotateCcw],
  ["Secure Payment", "100% secure checkout", ShieldCheck],
  ["24/7 Support", "We're here to help", Headphones],
];

const BenefitsSection = () => (
  <section className="container-page pb-8">
    <div className="grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map(([title, description, Icon], index) => (
        <div
          key={title}
          className={`flex items-center gap-4 px-5 py-5 ${
            index < benefits.length - 1
              ? "border-b border-gray-200 dark:border-gray-800 sm:border-r lg:border-b-0"
              : ""
          }`}
        >
          {/* Icon */}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm transition-colors duration-300 dark:bg-gray-800 dark:text-purple-400">
            <Icon size={20} />
          </span>

          {/* Content */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default BenefitsSection;