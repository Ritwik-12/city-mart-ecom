import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { isAdmin } from "../../utils/auth";
import { useSelector } from "react-redux";

const links = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Categories", "/categories"],
  ["Deals", "/shop?sort=discount"],
  ["New Arrivals", "/shop?sort=new"],
  ["Brands", "/shop"],
  ["Track Order", "/track-order"],
  ["Help Center", "/help"],
];

const NavigationBar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="hidden border-b border-gray-100 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 lg:block">
      <div className="container-page flex h-12 items-center justify-center gap-7 xl:gap-9">
        {links.map(([label, href]) => {
          const active =
            label === "Home"
              ? location.pathname === "/"
              : label === "Shop"
                ? location.pathname.startsWith("/shop") ||
                  location.pathname.startsWith("/products")
                : label === "Categories"
                  ? location.pathname.startsWith("/categories")
                  : false;

          return (
            <Link
              key={label}
              to={href}
              className={`relative flex h-full items-center gap-1 whitespace-nowrap text-[13px] font-semibold transition ${
                active
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              }`}
            >
              {label}

              {label === "Categories" && <ChevronDown size={14} />}

              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-purple-600" />
              )}
            </Link>
          );
        })}

        {isAdmin(user) && (
          <Link
            to="/admin"
            className="rounded-lg bg-gray-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 dark:bg-purple-600 dark:hover:bg-purple-700"
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;