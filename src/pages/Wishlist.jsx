/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const navigate   = useNavigate();
  const { addToCart } = useCart();

  const [wishlistIds, setWishlistIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); }
    catch { return []; }
  });
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(false);

  // Listen for localStorage changes from ProductCard (other tabs / same tab via custom event)
  useEffect(() => {
    const sync = () => {
      try {
        const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistIds(ids);
      } catch { /* ignore */ }
    };
    window.addEventListener("storage", sync);
    // Also sync on focus (user navigates back to this tab)
    window.addEventListener("focus", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("focus", sync); };
  }, []);

  // Fetch product details for all wishlisted IDs
  useEffect(() => {
    if (wishlistIds.length === 0) { setProducts([]); return; }
    setLoading(true);
    Promise.all(
      wishlistIds.map((id) => axios.get(`https://dummyjson.com/products/${id}`).then((r) => r.data).catch(() => null))
    ).then((res) => setProducts(res.filter(Boolean))).finally(() => setLoading(false));
  }, [wishlistIds]);

  const removeOne = (productId) => {
    const updated = wishlistIds.filter((id) => String(id) !== String(productId));
    setWishlistIds(updated);
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(productId)));
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.info("Removed from wishlist");
  };

  const clearAll = () => {
    setWishlistIds([]); setProducts([]);
    localStorage.setItem("wishlist", "[]");
    toast.info("Wishlist cleared");
  };

  const addOneToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart! 🛒", { autoClose: 1200 });
  };

  const addAllToCart = () => {
    products.forEach((p) => addToCart(p));
    toast.success(`${products.length} items added to cart! 🛒`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#155dfc] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <IoHeart className="text-red-500" />
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {products.length} {products.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {products.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button onClick={addAllToCart}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#155dfc] text-white text-sm font-semibold rounded-xl hover:bg-[#1249d4]"
              >
                <FiShoppingCart size={14} /> Add All to Cart
              </button>
              <button onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-red-400 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FiTrash2 size={14} /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* How to add — helper tip shown when empty */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[55vh] text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5">
              <IoHeartOutline className="text-4xl text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 max-w-xs">
              Click the <span className="inline-flex items-center gap-1 text-red-500 font-semibold"><IoHeartOutline className="inline" size={14}/> heart icon</span> on any product card to save it here.
            </p>
            <p className="text-gray-400 text-xs mb-6">You can add products from the Products page or any product detail page.</p>
            <button onClick={() => navigate("/products")}
              className="px-6 py-3 bg-[#155dfc] text-white font-bold rounded-xl hover:bg-[#1249d4]"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => {
              const disc = product.discountPercentage || 0;
              const orig = disc > 0 ? Math.round(product.price / (1 - disc / 100)) : null;
              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm group"
                >
                  {/* Image */}
                  <div
                    className="relative aspect-square bg-gray-50 dark:bg-[#111] cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-105"
                      style={{ transition: "transform 0.25s ease" }}
                    />
                    {disc > 0 && (
                      <span className="absolute top-2 left-2 bg-[#155dfc] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {Math.round(disc)}% OFF
                      </span>
                    )}
                    {/* Remove button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeOne(product.id); }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30"
                      aria-label="Remove"
                    >
                      <IoHeart className="text-red-500" size={14} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col gap-2">
                    <h3
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-[#155dfc]"
                    >
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-[#155dfc]">${product.price}</span>
                      {orig && <span className="text-xs text-gray-400 line-through">${orig}</span>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addOneToCart(product)}
                        disabled={product.stock === 0}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold ${
                          product.stock === 0
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                            : "bg-[#155dfc] hover:bg-[#1249d4] text-white"
                        }`}
                      >
                        <FiShoppingCart size={13} />
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => removeOne(product.id)}
                        className="w-10 h-10 rounded-xl border-2 border-red-200 dark:border-red-900 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center shrink-0"
                        aria-label="Remove"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;