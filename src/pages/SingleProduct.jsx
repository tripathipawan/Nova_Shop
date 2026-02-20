import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline, IoHeartOutline, IoHeart, IoShareSocialOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Star, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch { return []; }
  });
  const [activeTab, setActiveTab] = useState("description"); // description | reviews | specs

  const isWishlisted = wishlist.includes(id);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
      setSelectedImage(0);
      setQuantity(1);
    } catch (err) {
      setError("Product not found.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchProduct]);

  const toggleWishlist = () => {
    const updated = isWishlisted
      ? wishlist.filter((w) => w !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist ❤️");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    // Add to cart 'quantity' times (or pass quantity to addToCart if supported)
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Show only one toast regardless
    toast.dismiss();
    toast.success(`${quantity}x "${product.title}" added to cart! 🛒`);
  };

  const allImages = product
    ? [product.thumbnail, ...(product.images || []).filter((img) => img !== product.thumbnail)]
    : [];

  const discountPercentage = product?.discountPercentage || 0;
  const originalPrice =
    discountPercentage > 0
      ? Math.round(product.price / (1 - discountPercentage / 100))
      : null;

  const maxQty = Math.min(product?.stock || 10, 10);

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-[#111]">
        <video muted autoPlay loop className="w-28">
          <source src={Loading} type="video/webm" />
        </video>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 animate-pulse">
          Loading product...
        </p>
      </div>
    );
  }

  // ── Error ──
  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-xl font-bold text-gray-800 dark:text-white">
          {error || "Product not found"}
        </p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-[#155dfc] text-white rounded-xl font-semibold hover:bg-[#1249d4]"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const tabs = [
    { key: "description", label: "Description" },
    { key: "reviews", label: `Reviews (${product.reviews?.length || 0})` },
    { key: "specs", label: "Specifications" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] pb-12">
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* ── IMAGE SECTION ── */}
            <div className="p-4 md:p-8 bg-gray-50 dark:bg-[#0a0a0a]">
              {/* Main image */}
              <div className="relative group aspect-square rounded-2xl overflow-hidden bg-white dark:bg-[#111] mb-3">
                <img
                  src={allImages[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.target.src = product.thumbnail; }}
                />
                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 bg-[#155dfc] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {Math.round(discountPercentage)}% OFF
                  </span>
                )}
                {/* Stock badge */}
                {product.stock < 10 && product.stock > 0 && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Only {product.stock} left!
                  </span>
                )}
                {/* Image nav arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-black/60 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <FiChevronLeft />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % allImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-black/60 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <FiChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.slice(0, 6).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-14 h-14 rounded-xl border-2 overflow-hidden transition-all ${
                        selectedImage === i
                          ? "border-[#155dfc] shadow-sm shadow-[#155dfc]/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-[#155dfc]/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${i}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = product.thumbnail; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── DETAILS SECTION ── */}
            <div className="p-5 md:p-8 flex flex-col gap-4">
              {/* Brand + Category */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.brand && (
                  <span className="text-xs font-semibold bg-[#155dfc]/10 text-[#155dfc] px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                )}
                <span className="text-xs text-gray-400 capitalize">
                  {product.category?.replace(/-/g, " ")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-3xl md:text-4xl font-black text-[#155dfc]">
                  ${product.price}
                </span>
                {originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${originalPrice}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg">
                    You save ${(originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? `Only ${product.stock} left in stock`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Quantity:
                </span>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center font-bold text-[#155dfc] hover:bg-[#155dfc] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900 dark:text-white text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    disabled={quantity >= maxQty}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center font-bold text-[#155dfc] hover:bg-[#155dfc] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  Max {maxQty}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all ${
                    product.stock === 0
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-[#155dfc] hover:bg-[#1249d4] text-white shadow-lg shadow-[#155dfc]/25 hover:shadow-xl hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  <IoCartOutline size={18} />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                    isWishlisted
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
                      : "border-gray-200 dark:border-gray-700 hover:border-red-400 hover:text-red-400 text-gray-400"
                  }`}
                  aria-label="Wishlist"
                >
                  {isWishlisted ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                </button>

                <button
                  onClick={handleShare}
                  className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-[#155dfc] hover:text-[#155dfc] transition-all"
                  aria-label="Share"
                >
                  <IoShareSocialOutline size={20} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                {[
                  { icon: Truck, label: "Free Delivery", sub: "Orders over $100" },
                  { icon: RefreshCcw, label: "Easy Returns", sub: "30 day policy" },
                  { icon: ShieldCheck, label: "Secure Buy", sub: "100% protected" },
                ].map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center gap-1 p-2">
                      <Icon className="text-[#155dfc] w-4 h-4" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {b.label}
                      </span>
                      <span className="text-[10px] text-gray-400">{b.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── TABS SECTION ── */}
          <div className="border-t border-gray-100 dark:border-gray-800">
            {/* Tab nav */}
            <div className="flex gap-0 border-b border-gray-100 dark:border-gray-800 px-4 md:px-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-shrink-0 px-4 py-4 text-sm font-semibold border-b-2 transition-all -mb-px ${
                    activeTab === tab.key
                      ? "border-[#155dfc] text-[#155dfc]"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-5 md:p-8">
              {activeTab === "description" && (
                <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {product.description || "No description available."}
                </p>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((review, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                              {review.reviewerName || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {review.date ? new Date(review.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : ""}
                            </p>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, si) => (
                              <Star
                                key={si}
                                className={`w-3.5 h-3.5 ${si < (review.rating || 0) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No reviews yet.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "specs" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ["Brand", product.brand],
                    ["Category", product.category?.replace(/-/g, " ")],
                    ["SKU", product.sku],
                    ["Weight", product.weight ? `${product.weight}g` : null],
                    ["Stock", product.stock],
                    ["Minimum Order", product.minimumOrderQuantity || 1],
                    ["Warranty", product.warrantyInformation],
                    ["Shipping", product.shippingInformation],
                    ["Return Policy", product.returnPolicy],
                    ["Availability", product.availabilityStatus],
                  ]
                    .filter(([, val]) => val)
                    .map(([label, val], i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800">
                        <span className="text-xs font-semibold text-gray-400 uppercase w-28 flex-shrink-0 pt-0.5">
                          {label}
                        </span>
                        <span className="text-sm text-gray-800 dark:text-gray-200 capitalize">
                          {String(val)}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Back Button ── */}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-[#155dfc] hover:underline"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

