import { useEffect, useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import {
  getProducts,
  getProductsByCategory,
  searchProductsByKeyword,
} from "../../services/productService";
import PageHeader from "../../components/common/PageHeader";
import ProductCard from "../../components/product/ProductCard";
import Spinner from "../../components/common/Spinner";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";

const Shop = () => {
  const [params, setParams] = useSearchParams();

  const search = params.get("keyword") || "";
  const categoryName = params.get("category") || "";
  const categoryId = params.get("categoryId");
  const page = Number(params.get("page") || 0);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [meta, setMeta] = useState({
    totalPages: 0,
    totalElements: 0,
    lastPage: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState("productId:asc");

  const [sortBy, sortOrder] = useMemo(
    () => sort.split(":"),
    [sort],
  );

  useEffect(() => {
    getCategories({ pageSize: 50 })
      .then((data) => setCategories(data?.content || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    const request = categoryId
      ? getProductsByCategory(categoryId, {
          pageNumber: page,
          pageSize: 12,
          sortBy,
          sortOrder,
        })
      : search
        ? searchProductsByKeyword(search, {
            pageNumber: page,
            pageSize: 12,
            sortBy,
            sortOrder,
          })
        : getProducts({
            pageNumber: page,
            pageSize: 12,
            sortBy,
            sortOrder,
            ...(categoryName ? { category: categoryName } : {}),
          });

    request
      .then((data) => {
        if (cancelled) return;

        setProducts(data?.content || []);
        setMeta(data || {});
      })
      .catch((err) => {
        if (cancelled) return;

        if (
          err.response?.status === 404 ||
          err.response?.status === 302
        ) {
          setProducts([]);
        } else {
          setError("Unable to load products right now.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    search,
    categoryName,
    categoryId,
    page,
    sortBy,
    sortOrder,
  ]);

  const changeParam = (key, value) => {
    const next = new URLSearchParams(params);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    next.set("page", "0");
    setParams(next);
  };

  const changePage = (newPage) => {
    const next = new URLSearchParams(params);

    next.set("page", String(newPage));

    setParams(next);
  };

  const clearFilters = () => {
    setParams({});
    setSort("productId:asc");
  };

  return (
    <>
      <PageHeader
        eyebrow="Ecom shop"
        title={
          search
            ? `Search results for "${search}"`
            : categoryName || "Shop all products"
        }
        description="Browse the catalog, filter by category, and sort products to find the right fit."
      />

      <section className="container-page py-8">
        {/* Top filters */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileFilters(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:hidden"
          >
            <Filter size={16} />
            Filters
          </button>

          <span className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
            {meta.totalElements ?? products.length} products
          </span>

          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal
              size={16}
              className="text-gray-400 dark:text-gray-500"
            />

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);

                const next = new URLSearchParams(params);
                next.set("page", "0");

                setParams(next);
              }}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-purple-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-purple-500"
            >
              <option value="productId:asc">Default</option>
              <option value="price:asc">
                Price: low to high
              </option>
              <option value="price:desc">
                Price: high to low
              </option>
              <option value="productName:asc">
                Name: A-Z
              </option>
              <option value="productName:desc">
                Name: Z-A
              </option>
              <option value="discount:desc">
                Highest discount
              </option>
              <option value="productId:desc">
                Newest first
              </option>
            </select>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[220px_1fr]">

          {/* Desktop category filter */}
          <aside className="hidden rounded-2xl border border-gray-100 bg-white p-5 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-800 lg:block">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Categories
              </h2>

              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 space-y-1">

              {/* All products */}
              <button
                onClick={clearFilters}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  !categoryName && !categoryId
                    ? "bg-purple-50 font-semibold text-purple-700 dark:bg-purple-500/15 dark:text-purple-300"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                All products
              </button>

              {/* Categories */}
              {categories.map((category) => (
                <button
                  key={category.categoryId}
                  onClick={() => {
                    const next = new URLSearchParams();

                    next.set(
                      "category",
                      category.categoryName,
                    );

                    next.set(
                      "categoryId",
                      category.categoryId,
                    );

                    setParams(next);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    String(category.categoryId) === categoryId
                      ? "bg-purple-50 font-semibold text-purple-700 dark:bg-purple-500/15 dark:text-purple-300"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.categoryName}
                </button>
              ))}
            </div>
          </aside>

          {/* Products */}
          <div>
            {loading && (
              <div className="flex min-h-90 items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}

            {!loading && error && (
              <ErrorState
                message={error}
                onRetry={() =>
                  setParams(
                    new URLSearchParams(params),
                  )
                }
              />
            )}

            {!loading &&
              !error &&
              products.length === 0 && (
                <EmptyState
                  title="No products found"
                  description="Try another keyword or category."
                  action={
                    <Button onClick={clearFilters}>
                      Clear filters
                    </Button>
                  }
                />
              )}

            {!loading &&
              !error &&
              products.length > 0 && (
                <>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.productId}
                        product={product}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {Number(meta.totalPages || 0) > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">

                      <button
                        disabled={page === 0}
                        onClick={() =>
                          changePage(
                            Math.max(0, page - 1),
                          )
                        }
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Previous
                      </button>

                      <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
                        {page + 1} / {meta.totalPages}
                      </span>

                      <button
                        disabled={meta.lastPage}
                        onClick={() =>
                          changePage(page + 1)
                        }
                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </section>

      {/* Mobile filters */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <button
            className="absolute inset-0 bg-black/30 dark:bg-black/60"
            onClick={() =>
              setMobileFilters(false)
            }
            aria-label="Close filters"
          />

          <aside className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-auto rounded-t-3xl bg-white p-6 transition-colors duration-300 dark:bg-gray-900">

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white">
                Categories
              </h2>

              <button
                onClick={() =>
                  setMobileFilters(false)
                }
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Close filters"
              >
                <X />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">

              <button
                onClick={() => {
                  clearFilters();
                  setMobileFilters(false);
                }}
                className="rounded-xl border border-gray-200 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                All products
              </button>

              {categories.map((category) => (
                <button
                  key={category.categoryId}
                  onClick={() => {
                    const next =
                      new URLSearchParams();

                    next.set(
                      "category",
                      category.categoryName,
                    );

                    next.set(
                      "categoryId",
                      category.categoryId,
                    );

                    setParams(next);
                    setMobileFilters(false);
                  }}
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    String(category.categoryId) ===
                    categoryId
                      ? "border-purple-300 bg-purple-50 font-semibold text-purple-700 dark:border-purple-500/50 dark:bg-purple-500/15 dark:text-purple-300"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  {category.categoryName}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Shop;