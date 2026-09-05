import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Headphones,
  Home,
  Laptop,
  Smartphone,
  Sparkles,
  Shirt,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import Spinner from "../common/Spinner";

const iconMap = {
  electronics: Smartphone,
  fashion: Shirt,
  "home & living": Home,
  beauty: Sparkles,
  sports: Dumbbell,
  books: BookOpen,
  audio: Headphones,
  computers: Laptop,
  gaming: Gamepad2,
};

const fallbackCategories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Books",
];

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getCategories({ pageSize: 50 })
      .then((data) => {
        if (!active) return;

        setCategories(data?.content?.length ? data.content : []);
      })
      .catch(() => {
        if (active) {
          setCategories([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const items = categories.length
    ? categories
    : fallbackCategories.map((name, index) => ({
        categoryId: `fallback-${index}`,
        categoryName: name,
      }));

  return (
    <section className="container-page py-10 sm:py-12">
      {/* Section Heading */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-2xl">
            Shop by Category
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Explore products across our popular categories
          </p>
        </div>

        <Link
          to="/categories"
          className="hidden items-center gap-1 text-sm font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 sm:inline-flex"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        /* Category Cards */
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((category) => {
            const name = category.categoryName;

            const Icon =
              iconMap[name.toLowerCase()] || ShoppingBag;

            return (
              <Link
                key={category.categoryId}
                to={
                  typeof category.categoryId === "number"
                    ? `/shop?categoryId=${category.categoryId}&category=${encodeURIComponent(
                        name,
                      )}`
                    : "/shop"
                }
                className="
                  group
                  flex
                  min-w-29.5
                  flex-col
                  items-center
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-4
                  transition
                  hover:-translate-y-1
                  hover:border-purple-100
                  hover:shadow-lg
                  hover:shadow-purple-100/30
                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:hover:border-purple-500/40
                  dark:hover:shadow-purple-900/20
                  sm:min-w-0
                "
              >
                {/* Category Icon */}
                <span
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-50
                    text-gray-600
                    transition
                    group-hover:bg-purple-50
                    group-hover:text-purple-600
                    dark:bg-gray-800
                    dark:text-gray-300
                    dark:group-hover:bg-purple-500/15
                    dark:group-hover:text-purple-400
                  "
                >
                  <Icon size={24} strokeWidth={1.8} />
                </span>

                {/* Category Name */}
                <span
                  className="
                    mt-3
                    text-center
                    text-xs
                    font-semibold
                    text-gray-700
                    transition
                    group-hover:text-purple-600
                    dark:text-gray-200
                    dark:group-hover:text-purple-400
                  "
                >
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CategorySection;