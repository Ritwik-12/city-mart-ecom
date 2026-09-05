import { Mail, MessageCircleQuestion, Truck } from "lucide-react";
import PageHeader from "../components/common/PageHeader";

const Help = () => (
  <>
    <PageHeader eyebrow="Support" title="Help Center" description="Quick answers for shipping, returns, accounts and orders." />
    <section className="container-page grid gap-4 py-10 sm:grid-cols-3">
      {[
        ["Shipping & delivery", "Learn about delivery timelines and free shipping.", Truck],
        ["Returns & refunds", "Need help with a return? Review the return policy.", MessageCircleQuestion],
        ["Contact support", "For backend-specific support, connect your support channel here.", Mail],
      ].map(([title, description, Icon]) => (
        <div key={title} className="rounded-2xl border border-gray-100 p-6">
          <Icon className="text-purple-600" size={24} />
          <h2 className="mt-5 font-bold">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
        </div>
      ))}
    </section>
  </>
);

export default Help;
