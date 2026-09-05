import { ArrowRight, Laptop, Shirt } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanners = () => (
  <section className="container-page py-5">
    <div className="grid gap-4 md:grid-cols-2">

      {/* Fashion Banner */}
      <Link
        to="/shop?category=Fashion"
        className="group relative min-h-55 overflow-hidden rounded-2xl bg-pink-50 p-7 transition-colors duration-300 dark:bg-pink-950/30"
      >
        <Shirt
          className="absolute -bottom-6 right-6 h-40 w-40 text-pink-200 transition group-hover:scale-110 dark:text-pink-900"
          strokeWidth={1}
        />

        <div className="relative z-10 max-w-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            Up to 40% off
          </p>

          <h3 className="mt-3 text-2xl font-black text-gray-950 dark:text-white">
            Fashion Sale
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Fresh everyday styles at better prices.
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition group-hover:gap-3 dark:text-purple-400">
            Shop now <ArrowRight size={16} />
          </span>
        </div>
      </Link>

      {/* Electronics Banner */}
      <Link
        to="/shop?category=Electronics"
        className="group relative min-h-55 overflow-hidden rounded-2xl bg-blue-50 p-7 transition-colors duration-300 dark:bg-blue-950/30"
      >
        <Laptop
          className="absolute -bottom-5 right-5 h-44 w-44 text-blue-200 transition group-hover:scale-110 dark:text-blue-900"
          strokeWidth={1}
        />

        <div className="relative z-10 max-w-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Latest tech
          </p>

          <h3 className="mt-3 text-2xl font-black text-gray-950 dark:text-white">
            Best in Electronics
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Upgrade your setup with smart essentials.
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition group-hover:gap-3 dark:text-purple-400">
            Explore now <ArrowRight size={16} />
          </span>
        </div>
      </Link>

    </div>
  </section>
);

export default PromoBanners;