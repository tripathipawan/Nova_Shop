/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, memo, useCallback } from "react";
import { getData } from "../../context/DataContext";
import { BiCategory } from "react-icons/bi";

const Category = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, fetchAllProducts } = getData();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const unique = [...new Set(data.map((i) => i.category))].filter(Boolean);
      setCategories(unique);
      setIsLoading(false);
    }
  }, [data]);

  // Track active category from URL
  useEffect(() => {
    const match = location.pathname.match(/\/category\/(.+)/);
    if (match) {
      setActiveCategory(match[1]);
    } else if (location.pathname === "/products") {
      setActiveCategory("all");
    } else {
      setActiveCategory("");
    }
  }, [location.pathname]);

  const handleCategoryClick = useCallback(
    (cat) => {
      setActiveCategory(cat);
      navigate(`/category/${cat}`);
    },
    [navigate]
  );

  if (isLoading || categories.length === 0) {
    return (
      <div className="sticky z-40 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[100px] h-8 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky z-40 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div
          className="flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* All button */}
          <button
            onClick={() => { setActiveCategory("all"); navigate("/products"); }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-[#155dfc] text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#155dfc]/10 hover:text-[#155dfc]"
            }`}
          >
            <BiCategory className="text-base" />
            All
          </button>

          {/* Category pills */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#155dfc] text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#155dfc]/10 hover:text-[#155dfc]"
              }`}
            >
              {cat.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

Category.displayName = "Category";

export default Category;
