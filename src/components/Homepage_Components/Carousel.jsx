import { memo } from "react";
import { FiShoppingBag, FiStar, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import Banner1 from "../../assets/Banner1.webp";

const Carousel = memo(() => {
  return (
    <section
      aria-label="Hero banner"
      className="w-full overflow-hidden bg-gradient-to-r from-[#f8f6f1] to-[#efece5] dark:from-[#0f0f0f] dark:to-[#1a1a1a] relative"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#155dfc]/10 rounded-full blur-3xl" />
        <div className="absolute rounded-full -bottom-20 -left-20 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl md:py-16 lg:py-20">
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 md:gap-12 lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#155dfc] to-[#4f87ff] text-white shadow-lg">
              <FiTrendingUp aria-hidden="true" />
              New Collection 2026 🚀
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Elevate Your <br />
              <span className="bg-gradient-to-r from-[#155dfc] to-[#4f87ff] bg-clip-text text-transparent">
                Shopping Experience
              </span>
            </h1>

            <p className="hero-description max-w-lg text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
              Premium products, smooth checkout, lightning fast delivery.
              Designed for modern shoppers who value quality and speed.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/products"
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#155dfc] to-[#4f87ff] text-white font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                aria-label="Shop all products"
              >
                <FiShoppingBag aria-hidden="true" />
                Shop Now
              </Link>

              <Link
                to="/products"
                className="px-8 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[#155dfc] transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Explore deals"
              >
                Explore Deals
              </Link>
            </div>
            <dl
              className="flex flex-wrap gap-8 mt-10"
              aria-label="Store statistics"
            >
              {[
                { label: "Products",  value: "10K+" },
                { label: "Customers", value: "50K+" },
                { label: "Rating",    value: "4.9⭐" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <dd className="text-2xl md:text-3xl font-bold text-[#155dfc]">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-sm text-gray-600 dark:text-gray-400">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative order-1 lg:order-2">
            <div className="relative group">
              <div
                className="absolute -inset-5 bg-gradient-to-tr from-[#155dfc] via-pink-500 to-orange-400 rounded-3xl blur-2xl opacity-60"
                aria-hidden="true"
              />

              <div
                className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-white/10 transition-transform duration-300 hover:scale-[1.02]"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={Banner1}
                  alt="NovaShop — Premium products with fast delivery across India"
                  loading="eager"
                  fetchPriority="high"
                  width="1280"
                  height="853"
                  decoding="async"
                  className="object-cover object-center w-full h-full"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              {/* Floating badge — Fast Delivery */}
              <div className="absolute bottom-2 left-2 bg-[#000e2c] px-4 py-2 rounded-2xl shadow-2xl border border-[#00091b] backdrop-blur-sm">
                <p className="flex items-center text-sm text-white">⚡ Fast Delivery</p>
                <span className="text-xs text-gray-300">All over India</span>
              </div>
              <div
                className="absolute px-5 py-3 shadow-2xl top-2 right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl hover:scale-105 transition-transform duration-200"
                role="img"
                aria-label="Rated 4.9 out of 5 stars"
              >
                <div className="flex items-center gap-2" aria-hidden="true">
                  <FiStar className="text-white" size={20} />
                  <span className="text-lg font-bold text-white">4.9</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

Carousel.displayName = "Carousel";
export default Carousel;