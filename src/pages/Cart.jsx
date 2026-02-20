import { useCart } from "../context/CartContext";
import { FaRegTrashAlt, FaShippingFast, FaLock } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining, MdLocalOffer } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { AiOutlinePercentage } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import emptyCart from "../assets/empty-cart.png";

const Cart = () => {
  const { cartItem = [], updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [deliveryInfoSaved, setDeliveryInfoSaved] = useState(false);

  // Timer
  useEffect(() => {
    if (cartItem.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cartItem.length]);

  // Load saved delivery info
  useEffect(() => {
    try {
      const saved = localStorage.getItem("deliveryInfo");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(JSON.parse(saved));
        setDeliveryInfoSaved(true);
      }
    } catch {
      localStorage.removeItem("deliveryInfo");
    }
  }, []);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // Totals
  const itemsTotal = cartItem.reduce(
    (t, item) => t + item.price * (item.quantity || 1),
    0
  );
  const deliveryCharge = itemsTotal >= 100 ? 0 : 9.99;
  const handlingCharge = 2.99;
  const tax = itemsTotal * 0.1;
  const discount = appliedPromo?.discount || 0;
  const grandTotal = itemsTotal + deliveryCharge + handlingCharge + tax - discount;

  // Promo codes
  const promoCodes = [
    { code: "SAVE10", discount: 10, description: "$10 Off" },
    {
      code: "SAVE20",
      discount: 20,
      description: "$20 Off on $200+",
      minOrder: 200,
    },
    {
      code: "FIRST15",
      discount: 15,
      description: "15% Off First Order",
      isPercentage: true,
    },
  ];

  const handleApplyPromo = useCallback(() => {
    const promo = promoCodes.find(
      (p) => p.code === promoCode.trim().toUpperCase()
    );
    if (!promo) {
      toast.error("Invalid promo code");
      return;
    }
    if (promo.minOrder && itemsTotal < promo.minOrder) {
      toast.error(`Minimum order of $${promo.minOrder} required`);
      return;
    }
    const discountAmount = promo.isPercentage
      ? itemsTotal * (promo.discount / 100)
      : promo.discount;
    setAppliedPromo({ ...promo, discount: discountAmount });
    toast.success(`Promo applied! You saved $${discountAmount.toFixed(2)} 🎉`);
  }, [promoCode, itemsTotal]);

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    toast.info("Promo code removed");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setDeliveryInfoSaved(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10)
      errors.phone = "Valid phone number required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zipCode.trim()) errors.zipCode = "ZIP code is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveDelivery = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("deliveryInfo", JSON.stringify(formData));
      setDeliveryInfoSaved(true);
      toast.success("Delivery information saved ✅");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleCheckout = () => {
    if (!deliveryInfoSaved) {
      toast.warning("Please save your delivery information first");
      return;
    }
    // Simulate order placement
    setCheckoutSuccess(true);
    toast.success("Order placed successfully! 🎉");
    setTimeout(() => {
      navigate("/products");
    }, 3000);
  };

  // Order success screen
  if (checkoutSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoCheckmarkCircle className="text-5xl text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Order Placed! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Thank you, {user?.firstName || "Customer"}!
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">
            Redirecting to products...
          </p>
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#155dfc] rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Empty cart
  if (cartItem.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-4">
        <img
          src={emptyCart}
          alt="Empty Cart"
          className="w-48 sm:w-64 mb-6 opacity-80"
        />
        <h2 className="text-3xl font-bold text-[#155dfc] mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Looks like you haven't added anything yet
        </p>
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 bg-[#155dfc] text-white font-bold rounded-xl shadow-lg hover:bg-[#1249d4] transition-all hover:scale-105 active:scale-95"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-3 sm:px-4 md:px-6 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl text-[#155dfc]">
                Shopping Cart
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {cartItem.length} {cartItem.length === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-[#155dfc] text-[#155dfc] font-semibold hover:bg-[#155dfc] hover:text-white transition-all text-sm"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Timer */}
          {timeLeft > 0 && timeLeft < 600 && (
            <div className="flex items-center justify-between gap-3 p-3 text-white rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              <div className="flex items-center gap-2">
                <BiTimer className="text-xl" />
                <p className="text-sm font-medium">Complete your order soon!</p>
              </div>
              <span className="font-mono font-bold bg-white/20 px-3 py-1 rounded-lg">
                {formatTime(timeLeft)}
              </span>
            </div>
          )}

          {/* Free Shipping Bar */}
          {itemsTotal < 100 && (
            <div className="mt-3 bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <FaShippingFast className="inline mr-2 text-[#155dfc]" />
                Add{" "}
                <span className="font-bold text-[#155dfc]">
                  ${(100 - itemsTotal).toFixed(2)}
                </span>{" "}
                more for FREE shipping!
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-[#155dfc] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((itemsTotal / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Cart Items */}
          <div className="space-y-3 lg:col-span-2">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2 mb-1">
                      <h3
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-[#155dfc] transition-colors"
                      >
                        {item.title}
                      </h3>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                        aria-label="Remove item"
                      >
                        <FaRegTrashAlt className="text-red-500 text-xs" />
                      </button>
                    </div>

                    <p className="text-[#155dfc] font-bold text-lg mb-3">
                      ${item.price?.toFixed(2)}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-1 w-fit">
                        <button
                          onClick={() => updateQuantity(cartItem, item.id, "decrease")}
                          disabled={(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 text-[#155dfc] font-bold hover:bg-[#155dfc] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-sm dark:text-white">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem, item.id, "increase")}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 text-[#155dfc] font-bold hover:bg-[#155dfc] hover:text-white transition-all text-sm"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Subtotal:{" "}
                        <span className="font-semibold text-gray-800 dark:text-white">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Promo Codes */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 border-2 border-dashed border-[#155dfc]/40">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-white mb-3">
                <MdLocalOffer className="text-[#155dfc]" />
                Available Offers
              </h3>
              <div className="space-y-2">
                {promoCodes.map((promo) => (
                  <div
                    key={promo.code}
                    className="flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#155dfc] text-sm">
                        {promo.code}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {promo.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPromoCode(promo.code);
                        const p = promoCodes.find((pc) => pc.code === promo.code);
                        if (p.minOrder && itemsTotal < p.minOrder) {
                          toast.error(`Min. order $${p.minOrder} required`);
                          return;
                        }
                        const disc = p.isPercentage
                          ? itemsTotal * (p.discount / 100)
                          : p.discount;
                        setAppliedPromo({ ...p, discount: disc });
                        toast.success(`Promo applied! Saved $${disc.toFixed(2)} 🎉`);
                      }}
                      disabled={!!appliedPromo}
                      className="text-xs px-3 py-1.5 bg-[#155dfc]/10 text-[#155dfc] rounded-lg font-semibold hover:bg-[#155dfc] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-5">
                <GiShoppingBag className="text-[#155dfc]" />
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <LuNotebookText className="text-[#155dfc]" />
                    Items ({cartItem.length})
                  </span>
                  <span className="font-semibold">${itemsTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <MdDeliveryDining className="text-[#155dfc]" />
                    Delivery
                  </span>
                  {deliveryCharge === 0 ? (
                    <span className="font-semibold text-green-600">FREE</span>
                  ) : (
                    <span className="font-semibold">${deliveryCharge.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <GiShoppingBag className="text-[#155dfc]" />
                    Handling
                  </span>
                  <span className="font-semibold">${handlingCharge.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <AiOutlinePercentage className="text-[#155dfc]" />
                    Tax (10%)
                  </span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      <IoCheckmarkCircle />
                      {appliedPromo.code}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">
                        -${appliedPromo.discount.toFixed(2)}
                      </span>
                      <button onClick={handleRemovePromo}>
                        <IoClose className="text-red-500" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-800 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-black text-[#155dfc]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                  {appliedPromo && (
                    <p className="text-right text-xs text-green-600 mt-1">
                      You saved ${appliedPromo.discount.toFixed(2)}!
                    </p>
                  )}
                </div>
              </div>

              {/* Promo Input */}
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    disabled={!!appliedPromo}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none text-sm disabled:opacity-50 uppercase"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={!!appliedPromo || !promoCode}
                    className="px-4 py-2 bg-[#155dfc] text-white rounded-xl font-semibold text-sm hover:bg-[#1249d4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className={`w-full mt-4 font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${
                  deliveryInfoSaved
                    ? "bg-gradient-to-r from-[#155dfc] to-[#22edff] text-white hover:shadow-xl hover:scale-[1.02] active:scale-95"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaLock />
                {deliveryInfoSaved ? "Secure Checkout →" : "Save Delivery Info First"}
              </button>

              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <FaLock className="text-green-500" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <FaShippingFast className="text-blue-500" />
                  Fast Delivery
                </span>
              </div>
            </div>

            {/* Delivery Form */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-800 dark:text-white">
                  Delivery Info
                </h2>
                {deliveryInfoSaved && (
                  <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold">
                    <IoCheckmarkCircle />
                    Saved
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveDelivery} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.fullName || ""}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-gray-700 dark:text-gray-300 text-sm"
                  />
                </div>

                {[
                  { name: "phone", label: "Phone Number *", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { name: "address", label: "Street Address *", type: "text", placeholder: "123 Main St" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {field.label}
                    </label>
                    {field.name === "address" ? (
                      <textarea
                        name={field.name}
                        rows={2}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-xl border ${
                          formErrors[field.name]
                            ? "border-red-400"
                            : "border-gray-200 dark:border-gray-700"
                        } bg-white dark:bg-[#111] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none resize-none text-sm`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-xl border ${
                          formErrors[field.name]
                            ? "border-red-400"
                            : "border-gray-200 dark:border-gray-700"
                        } bg-white dark:bg-[#111] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none text-sm`}
                      />
                    )}
                    {formErrors[field.name] && (
                      <p className="text-xs text-red-500 mt-1">{formErrors[field.name]}</p>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "city", label: "City *", placeholder: "Delhi" },
                    { name: "zipCode", label: "ZIP *", placeholder: "110001" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-xl border ${
                          formErrors[field.name]
                            ? "border-red-400"
                            : "border-gray-200 dark:border-gray-700"
                        } bg-white dark:bg-[#111] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none text-sm`}
                      />
                      {formErrors[field.name] && (
                        <p className="text-xs text-red-500 mt-1">{formErrors[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#155dfc] text-white font-bold py-2.5 rounded-xl hover:bg-[#1249d4] transition-colors text-sm"
                  >
                    {deliveryInfoSaved ? "Update Info" : "Save Info"}
                  </button>
                  {deliveryInfoSaved && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ phone: "", address: "", city: "", zipCode: "" });
                        setDeliveryInfoSaved(false);
                        localStorage.removeItem("deliveryInfo");
                      }}
                      className="px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-medium py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;