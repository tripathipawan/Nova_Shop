/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiSearch } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Animated 404 number */}
        <div className="relative mb-8 select-none">
          <span
            className="text-[140px] sm:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-br from-[#155dfc] to-[#22edff] bg-clip-text text-transparent"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            404
          </span>
          <div className="absolute inset-0 bg-gradient-to-br from-[#155dfc]/10 to-[#22edff]/10 blur-3xl rounded-full -z-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#155dfc] text-white font-bold rounded-xl hover:bg-[#1249d4] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#155dfc]/30"
          >
            <FiHome />
            Go Home
          </button>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#155dfc] text-[#155dfc] font-bold rounded-xl hover:bg-[#155dfc]/10 transition-all hover:scale-105 active:scale-95"
          >
            <FiSearch />
            Browse Products
          </button>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#155dfc] opacity-30"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;