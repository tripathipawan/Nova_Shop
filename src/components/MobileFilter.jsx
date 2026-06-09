import { getData } from "../context/DataContext";
import { FiFilter, FiX, FiSearch, FiChevronDown } from "react-icons/fi";

const MobileFilter = ({
  openFilter, setOpenFilter,
  search, setSearch,
  brand, setBrand,
  priceRange, setPriceRange,
  category, setCategory,
  handleBrandChange, handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = getData();
  const activeCount = [
    search,
    category !== "All",
    brand !== "All",
    priceRange[1] < 5000,
  ].filter(Boolean).length;

  return (
    <>
      {/* ── Trigger Button (mobile only) ── */}
      <button
        onClick={() => setOpenFilter(true)}
        aria-label={`Open filters${activeCount > 0 ? `, ${activeCount} active` : ""}`}
        aria-expanded={openFilter}
        aria-controls="mobile-filter-drawer"
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-white shadow-sm"
      >
        <FiFilter size={14} className="text-[#155dfc]" aria-hidden="true" />
        Filters
        {activeCount > 0 && (
          <span className="bg-[#155dfc] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none" aria-hidden="true">
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Overlay ── */}
      <div
        onClick={() => setOpenFilter(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] ${openFilter ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ transition: "opacity 0.25s" }}
      />

      {/* ── Drawer ── */}
      <aside
        id="mobile-filter-drawer"
        aria-label="Product filters"
        aria-hidden={!openFilter}
        className="lg:hidden fixed top-0 left-0 h-screen w-[85%] max-w-[320px] z-[70] bg-white dark:bg-[#0f0f0f] flex flex-col shadow-2xl"
        style={{ transform: openFilter ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <FiFilter className="text-[#155dfc]" size={15} aria-hidden="true" />
            <span className="font-bold text-gray-900 dark:text-white">Filters</span>
            {activeCount > 0 && (
              <span className="bg-[#155dfc] text-white text-[10px] font-black px-2 py-0.5 rounded-full" aria-label={`${activeCount} active filters`}>
                {activeCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpenFilter(false)}
            aria-label="Close filters"
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#155dfc] hover:text-white transition-colors"
          >
            <FiX size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

          {/* Search */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Search</p>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} aria-hidden="true" />
              <label htmlFor="mob-search" className="sr-only">Search products</label>
              <input
                id="mob-search"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] focus:border-transparent outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <FiX size={12} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Category */}
          <fieldset>
            <legend className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2">Category</legend>
            <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto overscroll-contain">
              {categoryOnlyData?.map((cat, i) => (
                <label key={i}
                  className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    category === cat ? "border-[#155dfc] bg-[#155dfc]" : "border-gray-300 dark:border-gray-600 group-hover:border-[#155dfc]"
                  }`} aria-hidden="true">
                    {category === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" name="mob-cat" value={cat} checked={category === cat}
                    onChange={handleCategoryChange} className="sr-only" />
                  <span className={`text-sm capitalize ${category === cat ? "text-[#155dfc] font-semibold" : "text-gray-700 dark:text-gray-300"}`}>
                    {cat === "All" ? "All Categories" : cat.replace(/-/g, " ")}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Brand */}
          <div>
            <label htmlFor="mob-brand" className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-2 block">Brand</label>
            <div className="relative">
              <select
                id="mob-brand"
                value={brand}
                onChange={handleBrandChange}
                className="w-full appearance-none px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none pr-8 cursor-pointer"
              >
                {brandOnlyData?.map((b, i) => (
                  <option key={i} value={b}>{b === "All" ? "All Brands" : b}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} aria-hidden="true" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="mob-price" className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">Price</label>
              <span className="text-xs font-bold text-[#155dfc]">${priceRange[0]} – ${priceRange[1]}</span>
            </div>
            <input
              id="mob-price"
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              aria-label={`Price range up to $${priceRange[1]}`}
              aria-valuemin={0}
              aria-valuemax={5000}
              aria-valuenow={priceRange[1]}
              className="w-full accent-[#155dfc] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-600 dark:text-gray-400 font-medium mt-1" aria-hidden="true">
              <span>$0</span><span>$5000</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 shrink-0 flex gap-3">
          <button
            onClick={() => { setSearch(""); setCategory("All"); setBrand("All"); setPriceRange([0, 5000]); }}
            aria-label="Reset all filters"
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setOpenFilter(false)}
            className="flex-1 py-3 rounded-xl bg-[#155dfc] text-white text-sm font-bold hover:bg-[#1249d4] transition-colors"
          >
            Show Results
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileFilter;