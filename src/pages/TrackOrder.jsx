import { PackageSearch } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import { toast } from "sonner";
import { useState } from "react";

const TrackOrder = () => {
  const [id, setId] = useState("");
  return (
    <>
      <PageHeader eyebrow="Delivery" title="Track your order" description="Enter your order number to look up delivery information." />
      <section className="container-page py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 p-6 sm:p-8">
          <PackageSearch className="text-purple-600" size={28} />
          <h2 className="mt-5 text-xl font-bold">Order tracking</h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            The current backend does not expose a GET order-by-id endpoint yet. We keep this screen ready for that API.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); toast.info(`Tracking API is not available for #${id}.`); }} className="mt-6 flex gap-2">
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Order ID" className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-purple-300" />
            <Button type="submit">Track</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default TrackOrder;
