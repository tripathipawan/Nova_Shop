/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { getData } from "../../context/DataContext";

const gradients = [
  "from-[#667eea] to-[#764ba2]",
  "from-[#f093fb] to-[#f5576c]",
  "from-[#4facfe] to-[#00f2fe]",
  "from-[#43e97b] to-[#38f9d7]",
  "from-[#fa709a] to-[#fee140]",
  "from-[#30cfd0] to-[#330867]",
];

const Deals = memo(() => {
  const navigate = useNavigate();
  const { data, categoryOnlyData, fetchAllProducts } = getData();
  const [deals, setDeals]       = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchAllProducts(); }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const categories = categoryOnlyData.filter((c) => c !== "All");
    const dealsData  = categories.slice(0, 6).map((category, index) => {
      const categoryProducts = data.filter((p) => p.category === category);
      const avgDiscount = categoryProducts.length > 0
        ? Math.round(categoryProducts.reduce((s, p) => s + (p.discountPercentage || 0), 0) / categoryProducts.length)
        : 0;
      const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      const brands = [...new Set(categoryProducts.map((p) => p.brand).filter(Boolean))];
      return {
        id:       index + 1,
        category,
        subtitle: brands.slice(0, 2).join(", ") || `Top ${category}`,
        title:    category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        discount: avgDiscount > 0 ? `${avgDiscount}% Off` : "Best Deals",
        image:    randomProduct?.thumbnail || randomProduct?.images?.[0],
        gradient: gradients[index % gradients.length],
        count:    categoryProducts.length,
      };
    });
    setDeals(dealsData);
    setIsLoading(false);
  }, [data, categoryOnlyData]);

  if (isLoading) {
    return (
      <section aria-label="Deals loading" className="py-8 bg-white dark:bg-[#0a0a0a]">
        <div className="px-4 mx-auto max-w-7xl">
          {/* Heading placeholder — same height as real heading to prevent CLS */}
          <div className="my-6 text-center">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mx-auto mb-3" />
            <div className="h-5 w-48 bg-gray-100 dark:bg-gray-700 rounded animate-pulse mx-auto mb-8" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" style={{ height: "288px" }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="deals-heading" className="py-8 bg-white dark:bg-[#0a0a0a]">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="my-6 text-center">
          <h2 id="deals-heading" className="mb-2 text-3xl font-extrabold md:text-4xl text-gray-900 dark:text-white">
            Today's <span className="text-[#155dfc]">Best Deals</span>
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Amazing discounts across all categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <button
              key={deal.id}
              onClick={() => navigate(`/category/${deal.category}`)}
              aria-label={`Shop ${deal.title} — ${deal.discount}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 text-left w-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${deal.gradient}`} aria-hidden="true" />

              <div className="relative flex flex-col p-6" style={{ height: "288px" }}>
                <div className="absolute px-3 py-1 text-xs font-bold text-gray-800 rounded-full shadow-sm top-4 right-4 bg-white/90">
                  {deal.count} items
                </div>

                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-white/90">{deal.subtitle}</p>
                  <h3 className="mb-2 text-2xl font-bold text-white">{deal.title}</h3>
                  <div className="inline-block px-3 py-1 rounded-lg bg-white/95">
                    <p className="text-lg font-bold text-gray-900">{deal.discount}</p>
                  </div>
                </div>

                {/* Fixed-size image container — prevents CLS */}
                <div className="absolute bottom-5 right-5">
                  <div
                    className="overflow-hidden transition-transform duration-300 bg-white shadow-lg rounded-xl group-hover:scale-110"
                    style={{ width: "128px", height: "128px" }}
                  >
                    <img
                      src={deal.image}
                      alt={`${deal.title} category`}
                      loading="lazy"
                      width="128"
                      height="128"
                      decoding="async"
                      className="object-cover w-full h-full"
                      onError={(e) => { e.target.src = "https://placehold.co/128"; }}
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

Deals.displayName = "Deals";
export default Deals;