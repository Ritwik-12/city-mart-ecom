import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdmin } from "../../utils/auth";
import ThemeToggle from "../common/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const cartCount = useSelector((state) =>
    (state.cart.products || []).reduce(
      (sum, item) => sum + Number(item.quantity || 1),
      0,
    ),
  );

  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const submitSearch = (event) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      navigate("/shop");
      return;
    }

    navigate(`/shop?keyword=${encodeURIComponent(value)}`);
  };

  return (
    <>
      {/* ================= DESKTOP / MAIN NAVBAR ================= */}

      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur transition-colors dark:border-gray-800 dark:bg-gray-950/95">
        <div className="container-page flex min-h-18 items-center gap-3 sm:gap-5">

          {/* Mobile menu button */}

          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={23} />
          </button>

          {/* Logo */}

          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Ecom home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white">
              <ShoppingCart size={19} />
            </span>

            <span className="text-xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-2xl">
              CityMart
            </span>
          </Link>

          {/* Desktop Search */}

          <form
            onSubmit={submitSearch}
            className="hidden min-w-0 flex-1 lg:flex"
          >
            <div className="flex h-11 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white transition focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-50 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-purple-500 dark:focus-within:ring-purple-500/10">

              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
              />

              <button
                type="button"
                className="hidden items-center gap-1 border-l border-gray-100 px-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400 xl:flex"
              >
                All Categories
                <ChevronDown size={14} />
              </button>

              <button
                type="submit"
                aria-label="Search"
                className="flex w-12 shrink-0 items-center justify-center bg-purple-600 text-white transition hover:bg-purple-700"
              >
                <Search size={19} />
              </button>

            </div>
          </form>

          {/* Theme Toggle */}

          <ThemeToggle />

          {/* Right Actions */}

          <div className="ml-auto flex items-center gap-1 sm:gap-3">

            {/* User */}

            <Link
              to={user ? "/profile" : "/login"}
              className="group flex min-h-10 min-w-10 flex-col items-center justify-center rounded-xl px-2 text-gray-700 transition hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
            >
              <User size={21} />

              <span className="hidden text-[11px] font-medium sm:block">
                {user ? "Account" : "Login"}
              </span>
            </Link>

            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="group hidden min-h-10 min-w-10 flex-col items-center justify-center rounded-xl px-2 text-gray-700 transition hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400 sm:flex"
            >
              <Heart size={21} />

              <span className="text-[11px] font-medium">
                Wishlist
              </span>
            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              className="relative flex min-h-10 min-w-10 flex-col items-center justify-center rounded-xl px-2 text-gray-700 transition hover:bg-gray-50 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
            >
              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-600 px-1 text-[9px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}

              <span className="hidden text-[11px] font-medium sm:block">
                Cart
              </span>
            </Link>

          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}

        <div className="container-page pb-3 lg:hidden">
          <form onSubmit={submitSearch}>
            <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-purple-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-50 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-purple-500 dark:focus-within:bg-gray-900 dark:focus-within:ring-purple-500/10">

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
              />

              <button
                type="submit"
                aria-label="Search"
                className="flex w-11 items-center justify-center text-gray-600 dark:text-gray-300"
              >
                <Search size={19} />
              </button>

            </div>
          </form>
        </div>

      </header>

      {/* ================= MOBILE MENU ================= */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}

          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-black/30 dark:bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}

          <aside className="relative h-full w-[min(88vw,340px)] bg-white p-5 shadow-2xl transition-colors dark:bg-gray-950">

            <div className="flex items-center justify-between">

              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-extrabold text-gray-950 dark:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <ShoppingCart size={18} />
                </span>

                CityMart
              </Link>

              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

            </div>

            <nav className="mt-8 space-y-1">

              {[
                ["Home", "/"],
                ["Shop", "/shop"],
                ["Categories", "/categories"],
                ["Deals", "/shop?sort=discount"],
                ["New Arrivals", "/shop?sort=new"],
                ["Track Order", "/track-order"],
                ["Help Center", "/help"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-purple-50 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
                >
                  {label}
                </Link>
              ))}

              {isAdmin(user) && (
                <Link
                  to="/admin"
                  className="block rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white dark:bg-purple-600"
                >
                  Admin Dashboard
                </Link>
              )}

            </nav>

          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;