import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

import summer from "../../assets/banners/hero-summer-sale.svg";
import fashion from "../../assets/banners/hero-fashion.svg";
import tech from "../../assets/banners/hero-tech.svg";

const slides = [
  {
    eyebrow: "Summer sale",
    title: "Upgrade Your",
    accent: "Lifestyle",
    description: "Discover amazing products at unbeatable prices.",
    image: summer,
    tone: "purple",
  },
  {
    eyebrow: "New collection",
    title: "Fashion That",
    accent: "Defines You",
    description: "Explore everyday styles made for your next look.",
    image: fashion,
    tone: "orange",
  },
  {
    eyebrow: "Exclusive offer",
    title: "Smart Tech for",
    accent: "Better Living",
    description: "Latest gadgets and accessories for everyday life.",
    image: tech,
    tone: "blue",
  },
];

const HeroSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      5000,
    );

    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="container-page pt-5 sm:pt-7">
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 hero-shadow transition-colors duration-300 dark:border-gray-800 dark:bg-gray-800">
        <div className="grid min-h-125 lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-purple-600 dark:text-purple-400">
              {slide.eyebrow}
            </span>

            <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-gray-950 dark:text-white sm:text-5xl xl:text-6xl">
              {slide.title}

              <span className="block text-purple-600 dark:text-purple-400">
                {slide.accent}
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
              {slide.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop">
                <Button>
                  Shop Now <ArrowRight size={17} />
                </Button>
              </Link>

              <Link to="/categories">
                <Button variant="secondary">
                  Explore Categories
                </Button>
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400">
              <span>Free shipping over ₹999</span>

              <span className="hidden h-4 w-px bg-gray-200 dark:bg-gray-700 sm:block" />

              <span className="hidden sm:inline">
                7-day returns
              </span>
            </div>
          </div>

          <div className="relative min-h-65 overflow-hidden lg:min-h-full">
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
            />
          </div>
        </div>

        <button
          aria-label="Previous banner"
          onClick={() =>
            setActive((active - 1 + slides.length) % slides.length)
          }
          className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:text-purple-600 dark:bg-gray-900/90 dark:text-gray-200 dark:hover:text-purple-400 sm:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          aria-label="Next banner"
          onClick={() => setActive((active + 1) % slides.length)}
          className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:text-purple-600 dark:bg-gray-900/90 dark:text-gray-200 dark:hover:text-purple-400 sm:flex"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all ${
                active === index
                  ? "w-7 bg-purple-600"
                  : "w-2 bg-white/80 dark:bg-gray-400/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;