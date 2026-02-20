/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useAuth } from "@clerk/clerk-react";
import ScrollToTop from "react-scroll-to-top";

// --- Lazy-loaded pages ---
const Home            = lazy(() => import("./pages/Home"));
const Products        = lazy(() => import("./pages/Products"));
const About           = lazy(() => import("./pages/About"));
const Contact         = lazy(() => import("./pages/Contact"));
const Cart            = lazy(() => import("./pages/Cart"));
const SingleProduct   = lazy(() => import("./pages/SingleProduct"));
const CategoryProduct = lazy(() => import("./pages/CategoryProduct"));
const PolicyHub       = lazy(() => import("./pages/PolicyHub"));
const Wishlist        = lazy(() => import("./pages/Wishlist"));
const NotFound        = lazy(() => import("./pages/NotFound"));

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// --- Page Loader ---
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-white dark:bg-[#0f0f0f]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#155dfc] rounded-full animate-spin mx-auto mb-3" />
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

// --= Scroll to top on every route change ---
const ScrollRestorer = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- Fix black screen after Clerk login ---
const AuthHandler = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const path = window.location.pathname;
    const validRoutes = ["/", "/products", "/about", "/contact", "/cart", "/policyHub", "/wishlist"];
    const isValid =
      validRoutes.includes(path) ||
      path.startsWith("/products/") ||
      path.startsWith("/category/");
    if (!isValid) navigate("/", { replace: true });
  }, [isSignedIn, isLoaded, navigate]);

  return null;
};

// --- AppContent (needs to be inside BrowserRouter) ---
const AppContent = () => {
  const { cartItem, setCartItem } = useCart();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItem");
      if (stored) setCartItem(JSON.parse(stored));
    } catch {
      localStorage.removeItem("cartItem");
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <>
      <AuthHandler />
      <ScrollRestorer />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/products"            element={<Products />} />
          <Route path="/products/:id"        element={<SingleProduct />} />
          <Route path="/category/:category"  element={<CategoryProduct />} />
          <Route path="/about"               element={<About />} />
          <Route path="/contact"             element={<Contact />} />
          <Route path="/policyHub"           element={<PolicyHub />} />
          <Route path="/wishlist"            element={<Wishlist />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollToTop
        smooth
        color="white"
        style={{
          backgroundColor: "#155dfc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
        }}
      />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;