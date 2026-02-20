import { useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { getData } from "../../context/DataContext";

const Deals = memo(() => {
  const navigate = useNavigate();
  const { data, categoryOnlyData, fetchAllProducts } = getData();
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simple gradient combinations
  const gradients = [
    "from-[#667eea] to-[#764ba2]",
    "from-[#f093fb] to-[#f5576c]",
    "from-[#4facfe] to-[#00f2fe]",
    "from-[#43e97b] to-[#38f9d7]",
    "from-[#fa709a] to-[#fee140]",
    "from-[#30cfd0] to-[#330867]",
    "from-[#a8edea] to-[#fed6e3]",
    "from-[#ff9a56] to-[#ff6a88]",
  ];

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAllProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // eslint-disable-next-line react-hooks/immutability
      createDeals();
    }
  }, [data]);

  const createDeals = () => {
    const categories = categoryOnlyData.filter(cat => cat !== "All");
    
    const dealsData = categories.slice(0, 6).map((category, index) => {
      const categoryProducts = data.filter(p => p.category === category);
      
      const avgDiscount = categoryProducts.length > 0
        ? Math.round(
            categoryProducts.reduce((sum, p) => sum + (p.discountPercentage || 0), 0) / 
            categoryProducts.length
          )
        : 0;

      const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
      const brands = [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))];
      const brandText = brands.slice(0, 2).join(", ");

      return {
        id: index + 1,
        category: category,
        subtitle: brandText || `Top ${category}`,
        title: category.split("-").map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(" "),
        discount: avgDiscount > 0 ? `${avgDiscount}% Off` : "Best Deals",
        image: randomProduct?.thumbnail || randomProduct?.images?.[0],
        gradient: gradients[index % gradients.length],
        count: categoryProducts.length,
      };
    });

    setDeals(dealsData);
    setIsLoading(false);
  };

  const handleDealClick = (category) => {
    navigate(`/category/${category}`);
  };

  if (isLoading) {
    return (
      <section className="py-8 bg-white dark:bg-[#0a0a0a]">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 h-72 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white dark:bg-[#0a0a0a]">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="my-6 text-center">
          <h2 className="mb-2 text-3xl font-extrabold md:text-4xl text-gray-900 dark:text-white">
            Today's <span className="text-[#155dfc]">Best Deals</span> 
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Amazing discounts across all categories
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => handleDealClick(deal.category)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${deal.gradient}`} />

              {/* Content */}
              <div className="relative flex flex-col p-6 h-72">
                {/* Badge */}
                <div className="absolute px-3 py-1 text-xs font-bold text-gray-800 rounded-full shadow-sm top-4 right-4 bg-white/90">
                  {deal.count} items
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-white/90">
                    {deal.subtitle}
                  </p>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {deal.title}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-lg bg-white/95">
                    <p className="text-lg font-bold text-gray-900">
                      {deal.discount}
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="absolute bottom-5 right-5">
                  <div className="w-32 h-32 overflow-hidden transition-transform duration-300 bg-white shadow-lg rounded-xl group-hover:scale-110">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      loading="lazy"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Deals.displayName = 'Deals';

export default Deals;
