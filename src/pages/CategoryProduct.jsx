import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft, Package, TrendingUp } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const category = params.category || searchParams.get('category')

  const getFilterData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      
      let productsData = res.data.products || [];
      setSearchData(productsData);
      setLoading(false);

    } catch (error) {
      console.log("Error fetching category products:", error);
      setSearchData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getFilterData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [category]);

  // Loading State
  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#0a0a0a] dark:to-[#111]'>
        <video muted autoPlay loop className="w-40 mb-4">
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
          <div className="inline-block p-6 mb-6 bg-gray-100 rounded-full dark:bg-gray-800">
            <Package className="w-16 h-16 text-gray-400 dark:text-gray-600" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            No Products Found
          </h2>
          <p className="max-w-md mx-auto mb-8 text-gray-600 dark:text-gray-400">
            We couldn't find any products in this category. Try exploring other categories!
          </p>
          <button 
            onClick={() => navigate('/')} 
            className='flex items-center gap-2 px-8 py-3 mx-auto font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95'
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#0a0a0a]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-900 dark:via-pink-900 dark:to-red-900">
        <div className='max-w-6xl px-4 py-8 mx-auto'>
          <button 
            onClick={() => navigate('/')} 
            className='flex items-center gap-2 px-4 py-2 mb-6 text-white transition-all duration-200 rounded-lg cursor-pointer bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-105 active:scale-95'
            style={{ animation: 'slideInLeft 0.4s ease-out' }}
          >
            <ChevronLeft className="w-5 h-5" /> 
            Back to Home
          </button>
          
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <h1 className="mb-3 text-4xl font-black text-white capitalize md:text-5xl drop-shadow-lg">
              {category?.split('-').join(' ')}
            </h1>
            <div className="flex items-center gap-3 text-white/90">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
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
          <div className="p-4 transition-shadow bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">Total Items</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{searchData.length}</p>
          </div>
          <div className="p-4 transition-shadow bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">Avg. Discount</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(searchData.reduce((sum, p) => sum + (p.discountPercentage || 0), 0) / searchData.length)}%
            </p>
          </div>
          <div className="p-4 transition-shadow bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">Price Range</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${Math.min(...searchData.map(p => p.price))} - ${Math.max(...searchData.map(p => p.price))}
            </p>
          </div>
          <div className="p-4 transition-shadow bg-white shadow-sm dark:bg-gray-800 rounded-xl hover:shadow-md">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">Top Rated</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              ★ {Math.max(...searchData.map(p => p.rating || 0)).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-5">
          {searchData.map((product, idx) => (
            <div
              key={product.id}
              style={{
                animation: `slideInUp 0.4s ease-out ${idx * 0.05}s both`
              }}
            >
              <ProductListView product={product}/>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className="p-8 mt-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 rounded-2xl"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
        >
          <h3 className="mb-3 text-2xl font-bold text-white">
            Found what you're looking for?
          </h3>
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
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryProduct;





















