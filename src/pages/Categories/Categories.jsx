import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import { ShoppingBag } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories({ pageSize: 50 })
      .then((data) => setCategories(data?.content || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Categories"
        description="Browse the catalog by category."
      />

      <section className="container-page py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.categoryId}
                to={`/shop?categoryId=${
                  category.categoryId
                }&category=${encodeURIComponent(category.categoryName)}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/40 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-900 dark:hover:shadow-none"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600 transition-colors duration-300 group-hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:group-hover:bg-purple-900/40">
                  <ShoppingBag size={27} />
                </span>

                <h2 className="mt-4 text-sm font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-gray-100 dark:group-hover:text-purple-400">
                  {category.categoryName}
                </h2>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Categories;