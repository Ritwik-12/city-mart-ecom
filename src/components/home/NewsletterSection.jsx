import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Button from "../common/Button";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    toast.success("Thanks! You're on the list.");
    setEmail("");
  };

  return (
    <section className="container-page py-8 sm:py-10">
      <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-colors duration-300 sm:p-8 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800 dark:bg-gray-800">

        {/* Newsletter info */}
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm transition-colors duration-300 dark:bg-gray-900 dark:text-purple-400">
            <Mail size={22} />
          </span>

          <div>
            <h2 className="text-base font-bold text-gray-950 dark:text-white sm:text-lg">
              Stay updated with Ecom
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get the latest offers and product updates.
            </p>
          </div>
        </div>

        {/* Newsletter form */}
        <form onSubmit={submit} className="flex w-full max-w-md gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="
              min-w-0
              flex-1
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
              text-sm
              text-gray-900
              outline-none
              transition-colors
              duration-300
              placeholder:text-gray-400
              focus:border-purple-300
              focus:ring-4
              focus:ring-purple-50
              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white
              dark:placeholder:text-gray-500
              dark:focus:border-purple-500
              dark:focus:ring-purple-500/20
            "
          />

          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;