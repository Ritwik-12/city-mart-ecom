import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CreditCard, Mail } from "lucide-react";

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="mb-4 text-sm font-bold text-gray-950 dark:text-white">
      {title}
    </h3>

    <ul className="space-y-2.5">
      {links.map(([label, href]) => (
        <li key={label}>
          <Link
            to={href}
            className="text-sm text-gray-500 transition hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noreferrer"
    className="
      flex h-9 w-9 items-center justify-center
      rounded-full
      bg-gray-100 text-gray-600
      transition
      hover:bg-purple-50 hover:text-purple-600
      dark:bg-gray-800 dark:text-gray-300
      dark:hover:bg-purple-950 dark:hover:text-purple-400
    "
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className="mt-16 border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
    <div className="container-page py-12 sm:py-14">

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.25fr]">

        {/* Brand */}

        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-gray-950 dark:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white">
              <CreditCard size={18} />
            </span>

            CityMart
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
            Your one-stop destination for quality products at great prices.
          </p>

          <div className="mt-5 flex gap-2">
            <SocialIcon href="#" label="Facebook">
              <FaFacebookF size={15} />
            </SocialIcon>

            <SocialIcon href="#" label="Instagram">
              <FaInstagram size={15} />
            </SocialIcon>

            <SocialIcon href="#" label="X">
              <FaTwitter size={15} />
            </SocialIcon>

            <SocialIcon href="#" label="YouTube">
              <FaYoutube size={15} />
            </SocialIcon>
          </div>
        </div>

        {/* Links */}

        <FooterColumn
          title="Quick Links"
          links={[
            ["About Us", "/about"],
            ["Contact Us", "/contact"],
            ["Track Order", "/track-order"],
            ["FAQs", "/help"],
          ]}
        />

        <FooterColumn
          title="Customer Service"
          links={[
            ["Shipping & Delivery", "/help"],
            ["Returns & Refunds", "/help"],
            ["Privacy Policy", "/privacy"],
            ["Terms & Conditions", "/terms"],
          ]}
        />

        <FooterColumn
          title="Categories"
          links={[
            ["Electronics", "/shop"],
            ["Fashion", "/shop"],
            ["Home & Living", "/shop"],
            ["Beauty", "/shop"],
            ["Sports", "/shop"],
            ["Books", "/shop"],
          ]}
        />

        {/* Payment + Newsletter */}

        <div>

          <h3 className="mb-4 text-sm font-bold text-gray-950 dark:text-white">
            We Accept
          </h3>

          <div className="flex flex-wrap gap-2">
            {["VISA", "Mastercard", "UPI", "Paytm"].map((item) => (
              <span
                key={item}
                className="
                  rounded-md
                  border border-gray-200
                  px-2.5 py-2
                  text-[10px] font-bold text-gray-700
                  dark:border-gray-700
                  dark:text-gray-300
                  dark:bg-gray-900
                "
              >
                {item}
              </span>
            ))}
          </div>

          <h3 className="mb-3 mt-7 text-sm font-bold text-gray-950 dark:text-white">
            Stay updated
          </h3>

          <div className="
            flex overflow-hidden
            rounded-xl
            border border-gray-200
            bg-white
            dark:border-gray-700
            dark:bg-gray-900
          ">

            <span className="flex w-10 items-center justify-center text-gray-400">
              <Mail size={16} />
            </span>

            <input
              aria-label="Newsletter email"
              placeholder="Your email"
              className="
                min-w-0 flex-1
                bg-transparent
                px-2 py-2.5
                text-xs
                text-gray-900
                outline-none
                placeholder:text-gray-400
                dark:text-white
                dark:placeholder:text-gray-500
              "
            />

            <button className="bg-purple-600 px-3 text-xs font-semibold text-white hover:bg-purple-700">
              Join
            </button>

          </div>
        </div>

      </div>
    </div>

    {/* Bottom footer */}

    <div className="border-t border-gray-100 dark:border-gray-800">

      <div className="container-page flex flex-col gap-2 py-5 text-xs text-gray-400 dark:text-gray-500 sm:flex-row sm:items-center sm:justify-between">

        <span>© 2026 CityMart. All rights reserved.</span>

        <span>Built with React & Spring Boot</span>

      </div>

    </div>
  </footer>
);

export default Footer;