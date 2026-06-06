/* eslint-disable no-unused-vars */
import axios from "axios";
import useSEO from "../hooks/useSEO";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline, IoHeartOutline, IoHeart, IoShareSocialOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Star, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [quantity, setQuantity]     = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist]     = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist") || "[]"); }
    catch { return []; }
  });
  const [activeTab, setActiveTab]   = useState("description");

  const isWishlisted = wishlist.includes(id);

  useSEO({
    title:       product ? `${product.title} — NovaShop` : "Product — NovaShop",
    description: product
      ? `Buy ${product.title} at $${product.price}. ${product.description?.slice(0, 100) || ""}`
      : "Shop premium products at NovaShop.",
    schema: product ? {
      "@context": "https://schema.org",
      "@type":    "Product",
      name:        product.title,
      image:       product.thumbnail,
      description: product.description,
      brand:       { "@type": "Brand", name: product.brand || "NovaShop" },
      offers: {
        "@type":        "Offer",
        price:          product.price,
        priceCurrency:  "USD",
        availability:   product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: `https://knovashop.vercel.app/products/${product.id}`,
      },
      aggregateRating: product.rating ? {
        "@type":       "AggregateRating",
        ratingValue:   product.rating,
        bestRating:    5,
        reviewCount:   product.reviews?.length || 1,
      } : undefined,
    } : undefined,
  });

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

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Loading product">
        <div className="text-center">
          <video
            muted
            autoPlay
            loop
            playsInline
            aria-hidden="true"
            className="w-24 mx-auto"
          >
            <source src={Loading} type="video/webm" />
          </video>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 animate-pulse">Loading product...</p>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-4">
        <p className="text-gray-600 dark:text-gray-400">{error || "Product not found."}</p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-2.5 bg-[#155dfc] text-white rounded-xl font-semibold hover:bg-[#1249d4] transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const images     = product.images?.length ? product.images : [product.thumbnail];
  const discount   = product.discountPercentage || 0;
  const origPrice  = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null;
  const inStock    = product.stock > 0;
  const starCount  = Math.round(product.rating || 0);

  const trustBadges = [
    { icon: ShieldCheck, text: "Secure Payment"  },
    { icon: Truck,       text: "Fast Delivery"   },
    { icon: RefreshCcw,  text: "Easy Returns"    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-lg aspect-square">
              <img
                src={images[selectedImage]}
                alt={`${product.title} — image ${selectedImage + 1} of ${images.length}`}
                loading="eager"
                width="600"
                height="600"
                decoding="async"
                className="w-full h-full object-contain p-4"
              />
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-[#155dfc] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {Math.round(discount)}% OFF
                </span>
              )}
              {/* Prev / Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((p) => (p - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-black/60 shadow flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors"
                  >
                    <FiChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((p) => (p + 1) % images.length)}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-black/60 shadow flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors"
                  >
                    <FiChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap" role="list" aria-label="Product image thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    role="listitem"
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={selectedImage === i}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i
                        ? "border-[#155dfc] shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-[#155dfc]/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      width="64"
                      height="64"
                      className="w-full h-full object-contain bg-white dark:bg-[#111] p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Details ── */}
          <div className="space-y-5">
            {/* Brand */}
            {product.brand && (
              <span className="inline-block text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                {product.brand}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div
                className="flex items-center gap-2"
                aria-label={`Rating: ${product.rating.toFixed(1)} out of 5`}
              >
                <div className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < starCount ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {product.rating.toFixed(1)}
                </span>
                {product.reviews?.length && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews.length} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#155dfc]">${product.price}</span>
              {origPrice && (
                <span className="text-lg text-gray-400 line-through" aria-label={`Original price $${origPrice}`}>
                  ${origPrice}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  Save {Math.round(discount)}%
                </span>
              )}
            </div>

            {/* Stock */}
            <p className={`text-sm font-semibold ${inStock ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
              {inStock ? `✓ In Stock (${product.stock} available)` : "✗ Out of Stock"}
            </p>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span
                  className="w-10 text-center font-bold text-gray-900 dark:text-white"
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => { addToCart({ ...product, quantity }); toast.success("Added to cart! 🛒"); }}
                disabled={!inStock}
                aria-label={inStock ? `Add ${product.title} to cart` : "Out of stock"}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
                  inStock
                    ? "bg-[#155dfc] hover:bg-[#1249d4] text-white shadow-lg shadow-[#155dfc]/25 hover:scale-105 active:scale-95"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <IoCartOutline size={18} aria-hidden="true" />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-3">
              <button
                onClick={toggleWishlist}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={isWishlisted}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                  isWishlisted
                    ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800 text-red-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:text-red-500"
                }`}
              >
                {isWishlisted
                  ? <IoHeart size={16} aria-hidden="true" />
                  : <IoHeartOutline size={16} aria-hidden="true" />
                }
                {isWishlisted ? "Wishlisted" : "Wishlist"}
              </button>

              <button
                onClick={handleShare}
                aria-label="Share this product"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-[#155dfc] hover:text-[#155dfc] transition-all"
              >
                <IoShareSocialOutline size={16} aria-hidden="true" />
                Share
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full"
                >
                  <Icon size={13} className="text-[#155dfc]" aria-hidden="true" />
                  {text}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800" role="tablist">
                {["description", "reviews", "specs"].map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`tab-panel-${tab}`}
                    id={`tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-semibold capitalize transition-colors rounded-t-lg ${
                      activeTab === tab
                        ? "text-[#155dfc] border-b-2 border-[#155dfc]"
                        : "text-gray-600 dark:text-gray-400 hover:text-[#155dfc]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                {/* Description panel */}
                <div
                  role="tabpanel"
                  id="tab-panel-description"
                  aria-labelledby="tab-description"
                  hidden={activeTab !== "description"}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                  {product.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-[#155dfc]/10 text-[#155dfc] px-2.5 py-1 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reviews panel */}
                <div
                  role="tabpanel"
                  id="tab-panel-reviews"
                  aria-labelledby="tab-reviews"
                  hidden={activeTab !== "reviews"}
                >
                  {product.reviews?.length > 0 ? (
                    <ul className="space-y-4">
                      {product.reviews.map((rev, i) => (
                        <li key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-yellow-400 text-xs" aria-hidden="true">
                              {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              — {rev.reviewerName || "Customer"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{rev.comment}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No reviews yet.</p>
                  )}
                </div>

                {/* Specs panel */}
                <div
                  role="tabpanel"
                  id="tab-panel-specs"
                  aria-labelledby="tab-specs"
                  hidden={activeTab !== "specs"}
                >
                  <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      { label: "Category",        value: product.category },
                      { label: "Brand",            value: product.brand },
                      { label: "SKU",              value: product.sku },
                      { label: "Weight",           value: product.weight ? `${product.weight}g` : null },
                      { label: "Dimensions",       value: product.dimensions
                        ? `${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth} cm`
                        : null
                      },
                      { label: "Warranty",         value: product.warrantyInformation },
                      { label: "Shipping",         value: product.shippingInformation },
                      { label: "Return Policy",    value: product.returnPolicy },
                      { label: "Min Order Qty",    value: product.minimumOrderQuantity },
                    ]
                      .filter((s) => s.value)
                      .map(({ label, value }) => (
                        <div key={label} className="flex py-2.5 gap-4">
                          <dt className="w-36 shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {label}
                          </dt>
                          <dd className="text-sm text-gray-800 dark:text-gray-200 capitalize">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;