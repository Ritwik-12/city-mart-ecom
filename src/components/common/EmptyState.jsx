import { ShoppingBag } from "lucide-react";

const EmptyState = ({ title, description, action }) => (
  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors duration-300 dark:bg-gray-900 dark:text-gray-500">
      <ShoppingBag size={24} />
    </div>

    <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>

    {description && (
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    )}

    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;