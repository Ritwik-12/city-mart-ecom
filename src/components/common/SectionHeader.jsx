import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SectionHeader = ({
  title,
  subtitle,
  href = "/shop",
  action = "View all",
}) => (
  <div className="mb-6 flex items-end justify-between gap-4">
    <div>
      <h2 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-2xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>

    <Link
      to={href}
      className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 sm:inline-flex"
    >
      {action}
      <ArrowRight size={16} />
    </Link>
  </div>
);

export default SectionHeader;