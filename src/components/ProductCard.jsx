import { memo, useState, useCallback } from "react";
import { IoCartOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = memo(({ product }) => {
  const navigate    = useNavigate();
  const { addToCart } = useCart();

  const [wishlisted, setWishlisted] = useState(() => {
    try {
      const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
      return ids.includes(String(product.id));
    } catch { return false; }
  });

  const discount  = product.discountPercentage || 0;
  const origPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null;

  const toggleWishlist = useCallback((e) => {
    e.stopPropagation();
    try {
      const ids    = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const sid    = String(product.id);
      const already = ids.includes(sid);
      const updated = already ? ids.filter((x) => x !== sid) : [...ids, sid];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlisted(!already);
      toast(already ? "Removed from wishlist" : "Added to wishlist ❤️", {
        type: already ? "default" : "success",
        autoClose: 1500,
      });
    } catch { /* ignore */ }
  }, [product.id]);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added to cart! 🛒`, { autoClose: 1200 });
  }, [product, addToCart]);

  const goTo = useCallback(() => navigate(`/products/${product.id}`), [product.id, navigate]);

  return (
    <article className="relative bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm group">

      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-[#155dfc] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {Math.round(discount)}% OFF
        </span>
      )}

      {/* Wishlist heart */}
      <button
        onClick={toggleWishlist}
        aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        aria-pressed={wishlisted}
        className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border ${
          wishlisted
            ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-500"
            : "bg-white/90 dark:bg-black/50 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-300"
        }`}
      >
        {wishlisted ? <IoHeart size={14} aria-hidden="true" /> : <IoHeartOutline size={14} aria-hidden="true" />}
      </button>

      {/* ✅ FIX: Removed role="button" from div — use a real button instead */}
      <button
        onClick={goTo}
        aria-label={`View ${product.title}`}
        className="w-full aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden cursor-pointer block"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width="300"
          height="300"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transition: "transform 0.25s ease" }}
          onError={(e) => { e.currentTarget.src = "https://placehold.co/300"; }}
        />
      </button>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1.5">
        {/* Brand */}
        {product.brand && (
          // ✅ FIX: was text-gray-400 on gray-100 bg — now text-gray-600 (passes contrast)
          <span className="text-[10px] text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded w-fit truncate max-w-full">
            {product.brand}
          </span>
        )}

        {/* Title */}
        <h3
          onClick={goTo}
          className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-[#155dfc] leading-snug"
        >
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1" aria-label={`Rating: ${product.rating.toFixed(1)} out of 5`}>
            <span className="text-yellow-500 text-xs" aria-hidden="true">
              {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
            </span>
            {/* ✅ FIX: was text-gray-500 which fails contrast on white — now text-gray-600 */}
            <span className="text-[11px] text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-black text-[#155dfc]">${product.price}</span>
          {origPrice && (
            // ✅ FIX: aria-label on span is fine (non-interactive), removed prohibited usage
            <span className="text-[11px] text-gray-500 dark:text-gray-400 line-through">
              <span className="sr-only">Original price </span>${origPrice}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          aria-label={product.stock === 0 ? `${product.title} is out of stock` : `Add ${product.title} to cart`}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold ${
            product.stock === 0
              ? "bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-[#155dfc] hover:bg-[#1249d4] text-white"
          }`}
        >
          <IoCartOutline size={14} aria-hidden="true" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";
export default ProductCard;