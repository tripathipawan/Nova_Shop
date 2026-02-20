/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useCallback } from "react";
import { getData } from "../context/DataContext";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import FilterSection from "../components/FilterSection";
import MobileFilter from "../components/MobileFilter";
import Category from "../components/Homepage_Components/Category";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import Loading from "../assets/Loading4.webm";
import { FiChevronDown } from "react-icons/fi";

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const { data, fetchAllProducts, loading } = getData();

  const [search, setSearch]         = useState("");
  const [debSearch, setDebSearch]   = useState("");
  const [category, setCategory]     = useState("All");
  const [brand, setBrand]           = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage]             = useState(1);
  const [sortBy, setSortBy]         = useState("default");
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => { fetchAllProducts(); window.scrollTo(0, 0); }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebSearch(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openFilter]);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value); setPage(1);
  }, []);

  const handleBrandChange = useCallback((e) => {
    setBrand(e.target.value); setPage(1);
  }, []);

  const pageHandler = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Active filter badge count
  const activeCount = useMemo(() => [
    !!debSearch,
    category !== "All",
    brand !== "All",
    priceRange[1] < 5000,
  ].filter(Boolean).length, [debSearch, category, brand, priceRange]);

  // Filtered + sorted data
  const filteredData = useMemo(() => {
    let r = (data || []).filter((item) =>
      item.title?.toLowerCase().includes(debSearch.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand    === "All" || item.brand    === brand)    &&
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    if (sortBy === "price-low")  r = [...r].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") r = [...r].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     r = [...r].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === "discount")   r = [...r].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    return r;
  }, [data, debSearch, category, brand, priceRange, sortBy]);

  const totalPages    = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Shared filter props — passed to both desktop FilterSection and mobile MobileFilter
  const filterProps = {
    search, setSearch,
    category, setCategory, handleCategoryChange,
    brand, setBrand, handleBrandChange,
    priceRange, setPriceRange,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      {/* Category strip — sticky below navbar */}
      <Category />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 pb-14">

        {/* ── Page Header ── */}
        <div className="py-5 border-b border-gray-200 dark:border-gray-800 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">All Products</h1>
            {filteredData.length > 0 && !loading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {filteredData.length} products found
              </p>
            )}
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center gap-3 mt-4 mb-4 flex-wrap">
          {/* Mobile filter trigger — rendered inside MobileFilter component */}
          <MobileFilter
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            {...filterProps}
          />

          {/* Active filters badge — mobile */}
          {activeCount > 0 && (
            <button
              onClick={() => { setSearch(""); setCategory("All"); setBrand("All"); setPriceRange([0, 5000]); setSortBy("default"); setPage(1); }}
              className="lg:hidden text-xs font-bold text-red-500 border border-red-200 dark:border-red-900 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Clear filters ({activeCount})
            </button>
          )}

          {/* Sort dropdown — always visible */}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="appearance-none text-sm pl-3 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#155dfc] outline-none cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Best Discount</option>
            </select>
            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <video muted autoPlay loop className="w-24"><source src={Loading} type="video/webm" /></video>
            <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Loading products...</p>
          </div>
        ) : (
          <div className="flex gap-6">

            {/* ── DESKTOP SIDEBAR ─────────────────────────────────────── */}
            {/*
              w-56 / xl:w-60 = fixed width sidebar
              FilterSection handles its own sticky + scroll internally
            */}
            <div className="hidden lg:block shrink-0 w-56 xl:w-60">
              <FilterSection {...filterProps} />
            </div>

            {/* ── PRODUCT AREA ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Showing X-Y of Z (desktop) */}
              {filteredData.length > 0 && (
                <div className="hidden lg:flex items-center justify-between mb-3 gap-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filteredData.length)}
                      –
                      {Math.min(page * ITEMS_PER_PAGE, filteredData.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredData.length}</span>
                  </span>
                  {activeCount > 0 && (
                    <button
                      onClick={() => { setSearch(""); setCategory("All"); setBrand("All"); setPriceRange([0, 5000]); setSortBy("default"); setPage(1); }}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Clear filters ({activeCount})
                    </button>
                  )}
                </div>
              )}

              {/* Grid */}
              {paginatedData.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {paginatedData.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <Pagination pageHandler={pageHandler} page={page} dynamicPage={totalPages} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <div className="w-52"><Lottie animationData={notfound} /></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    No products match your filters.{" "}
                    <button
                      onClick={() => { setSearch(""); setCategory("All"); setBrand("All"); setPriceRange([0, 5000]); }}
                      className="text-[#155dfc] font-semibold hover:underline"
                    >
                      Clear filters
                    </button>
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
