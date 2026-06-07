/* eslint-disable react-hooks/set-state-in-effect */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft, Package, TrendingUp } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import useSEO from '../hooks/useSEO'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading]       = useState(true)
  const params                      = useParams()
  const [searchParams]              = useSearchParams()
  const navigate                    = useNavigate()

  const category = params.category || searchParams.get('category')

  // ✅ SEO for category pages
  const categoryName = category?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || ''
  useSEO({
    title: categoryName ? `${categoryName} — NovaShop` : "Category — NovaShop",
    description: categoryName ? `Shop ${categoryName} products on NovaShop. Fast delivery across India, best prices and easy returns.` : "Browse products on NovaShop.",
  })

  const getFilterData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
      setSearchData(res.data.products || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching category products:", error);
      setSearchData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      getFilterData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [category]);

  // Loading State
  if (loading) {
    return (
      <div
        className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#0a0a0a] dark:to-[#111]'
        role="status"
        aria-label="Loading products"
      >
        <video muted autoPlay loop playsInline aria-hidden="true" className="w-40 mb-4">
          <source src={Loading} type='video/webm'/>
        </video>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading products...</p>
      </div>
    );
  }

  // Empty State
  if (searchData.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#0a0a0a] dark:to-[#111] flex items-center justify-center px-4'>
        <div className="text-center" style={{ animation: 'fadeInUp 0.5s ease-out' }}>
          <div className="inline-block p-6 mb-6 bg-gray-100 rounded-full dark:bg-gray-800" aria-hidden="true">
            <Package className="w-16 h-16 text-gray-400 dark:text-gray-600" />
          </div>
          {/* ✅ FIX: h2 → h1 — this is the page's main heading when empty */}
          <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            No Products Found
          </h1>
          <p className="max-w-md mx-auto mb-8 text-gray-600 dark:text-gray-400">
            We couldn&apos;t find any products in this category. Try exploring other categories!
          </p>
          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-2 px-8 py-3 mx-auto font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95'
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Main Content
  const avgDiscount = Math.round(
    searchData.reduce((sum, p) => sum + (p.discountPercentage || 0), 0) / searchData.length
  );
  const minPrice = Math.min(...searchData.map(p => p.price));
  const maxPrice = Math.max(...searchData.map(p => p.price));
  const topRated = Math.max(...searchData.map(p => p.rating || 0)).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#0a0a0a]">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-900 dark:via-pink-900 dark:to-red-900">
        <div className='max-w-6xl px-4 py-8 mx-auto'>
          <button
            onClick={() => navigate('/')}
            aria-label="Go back to home"
            className='flex items-center gap-2 px-4 py-2 mb-6 text-white transition-all duration-200 rounded-lg cursor-pointer bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-105 active:scale-95'
            style={{ animation: 'slideInLeft 0.4s ease-out' }}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            Back to Home
          </button>

          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            {/* ✅ h1 — correct, main heading of this page */}
            <h1 className="mb-3 text-4xl font-black text-white capitalize md:text-5xl drop-shadow-lg">
              {categoryName}
            </h1>
            <div className="flex items-center gap-3 text-white/90">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" aria-hidden="true" />
                <span className="font-semibold">{searchData.length} Products</span>
              </div>
              <div className="hidden text-sm sm:block">
                Explore our amazing collection
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='max-w-6xl px-4 py-8 mx-auto'>

        {/* Stats Bar */}
        <div
          className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4"
          style={{ animation: 'fadeIn 0.6s ease-out 0.2s both' }}
        >
          {[
            { label: "Total Items",   value: searchData.length },
            { label: "Avg. Discount", value: `${avgDiscount}%`,  className: "text-green-600 dark:text-green-400" },
            { label: "Price Range",   value: `$${minPrice} – $${maxPrice}` },
            { label: "Top Rated",     value: `★ ${topRated}`,    className: "text-yellow-600 dark:text-yellow-400" },
          ].map(({ label, value, className }) => (
            <div key={label} className="p-4 transition-shadow bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">{label}</p>
              <p className={`text-2xl font-bold text-gray-900 dark:text-white ${className || ""}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Products List */}
        <div className="space-y-5" role="list" aria-label={`${categoryName} products`}>
          {searchData.map((product, idx) => (
            <div
              key={product.id}
              role="listitem"
              style={{ animation: `slideInUp 0.4s ease-out ${idx * 0.05}s both` }}
            >
              <ProductListView product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="p-8 mt-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 rounded-2xl"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
        >
          {/* ✅ FIX: h3 → h2 (comes after h1 above — correct hierarchy) */}
          <h2 className="mb-3 text-2xl font-bold text-white">
            Found what you&apos;re looking for?
          </h2>
          <p className="mb-6 text-white/90">
            Explore more categories and discover amazing deals!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 font-semibold text-purple-600 transition-all duration-200 bg-white rounded-lg hover:bg-gray-100 hover:scale-105 active:scale-95"
          >
            Browse All Categories
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CategoryProduct;