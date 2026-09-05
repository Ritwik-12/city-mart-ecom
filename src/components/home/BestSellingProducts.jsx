import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard";
import SectionHeader from "../common/SectionHeader";
import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("loading");

  const load = () => {
    setState("loading");

    getProducts({
      pageSize: 8,
      sortBy: "productId",
      sortOrder: "asc",
    })
      .then((data) => {
        setProducts(data?.content || []);
        setState(data?.content?.length ? "ready" : "empty");
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="container-page py-8 transition-colors duration-300 sm:py-10">
      <SectionHeader
        title="Featured Products"
        subtitle="A curated view of products from your catalog"
      />

      {state === "loading" && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {state === "error" && (
        <ErrorState
          message="We couldn't load products. Make sure the Spring Boot API is running."
          onRetry={load}
        />
      )}

      {state === "empty" && (
        <EmptyState
          title="No products yet"
          description="Add products through the backend and they will appear here."
          action={
            <Link to="/shop">
              <Button>Browse shop</Button>
            </Link>
          }
        />
      )}

      {state === "ready" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BestSellingProducts;