




/* eslint-disable react-hooks/set-state-in-effect */
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const navItems = [
  { name: "Home",      path: "/" },
  { name: "Products",  path: "/products" },
  { name: "Wishlist",  path: "/wishlist" },
  { name: "About",     path: "/about" },
  { name: "PolicyHub", path: "/policyHub" },
  { name: "Contact",   path: "/contact" },
];

const Navbar = () => {
  const { cartItem = [] }   = useCart();
  const location            = useLocation();
  const { isSignedIn }      = useUser();

  const [openNav, setOpenNav]     = useState(false);
  const [dark, setDark]           = useState(() => localStorage.getItem("theme") === "dark");
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const [bar, setBar] = useState({ left: 0, width: 0 });
  const ulRef  = useRef(null);
  const liRefs = useRef([]);

  const calcBar = useCallback(() => {
    const idx = navItems.findIndex((n) => n.path === location.pathname);
    const li  = liRefs.current[idx];
    if (!li || !ulRef.current) return;
    setBar({ left: li.offsetLeft, width: li.offsetWidth });
  }, [location.pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(calcBar);
    return () => cancelAnimationFrame(id);
  }, [calcBar]);

  useEffect(() => {
    window.addEventListener("resize", calcBar);
    return () => window.removeEventListener("resize", calcBar);
  }, [calcBar]);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const t = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(h > 0 ? (t / h) * 100 : 0);
        setScrolled(t > 20);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenNav(false); }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = openNav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openNav]);

  const toggleDark = useCallback(() => setDark((d) => !d), []);
  const closeNav   = useCallback(() => setOpenNav(false), []);

  const handleCartClick = useCallback((e) => {
    if (!isSignedIn) {
      e.preventDefault();
      toast.warning("🔒 Please sign in to access your cart!", { toastId: "cart-auth" });
    }
  }, [isSignedIn]);

  return (
    <>
      {/* ══════════ FIXED HEADER ══════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl shadow-md"
          : "bg-white dark:bg-[#0a0a0a] shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" onClick={closeNav}
            className="shrink-0 text-[22px] font-extrabold text-[#155dfc] leading-none"
          >
            <span className="text-gray-900 dark:text-white font-serif">Nova</span>Shop
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:block relative" style={{ paddingBottom: "12px" }}>
            <ul ref={ulRef} className="flex gap-6 text-sm font-medium">
              {navItems.map((item, idx) => (
                <li key={item.name} ref={(el) => (liRefs.current[idx] = el)}>
                  <NavLink to={item.path}
                    className={({ isActive }) =>
                      `block whitespace-nowrap hover:text-[#155dfc] transition-colors ${
                        isActive ? "text-[#155dfc] font-semibold" : "text-gray-700 dark:text-gray-200"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <span className="absolute bottom-0 h-[3px] rounded-full bg-[#155dfc] pointer-events-none"
              style={{ left: bar.left, width: bar.width, transition: "left 0.2s ease, width 0.2s ease" }}
            />
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5">
            <Link to="/wishlist"
              className="hidden lg:flex w-10 h-10 items-center justify-center rounded-xl text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <IoHeartOutline size={20} />
            </Link>

            <Link to="/cart" onClick={handleCartClick}
              className="hidden lg:flex relative w-10 h-10 items-center justify-center rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <IoCartOutline size={20} />
              {cartItem.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#155dfc] text-white text-[10px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                  {cartItem.length > 99 ? "99+" : cartItem.length}
                </span>
              )}
            </Link>

            <button onClick={toggleDark}
              className="hidden lg:flex w-10 h-10 items-center justify-center rounded-xl bg-[#155dfc]/10 hover:bg-[#155dfc] text-[#155dfc] hover:text-white transition-colors"
            >
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <div className="hidden lg:block ml-1">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-[#155dfc] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1249d4] transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
              </SignedIn>
            </div>

            {/* Mobile Hamburger — shows X when open */}
            <button onClick={() => setOpenNav((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {openNav ? <HiX size={22} /> : <HiMenuAlt1 size={22} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="h-[2px] bg-gray-100 dark:bg-gray-800">
          <div className="h-full bg-[#155dfc]" style={{ width: `${scrollPct}%`, transition: "none" }} />
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[66px]" />

      {/* ══════════ OVERLAY ══════════
          z-[60]: above header (z-50) — covers the header completely.
          This is WHY double logo was showing: header was peeking through
      -->*/}
      <div
        onClick={closeNav}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px] lg:hidden ${
          openNav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.25s" }}
      />

      {/* ══════════ MOBILE SIDEBAR ══════════
          z-[70]: above overlay (z-60) AND header (z-50).
          bg-white / dark:bg-[#0f0f0f] = SOLID, no transparency.
          top-0 h-screen: covers full screen height including area behind header.
      -->*/}
      <aside
        className="fixed top-0 right-0 h-screen z-[70] w-[78%] max-w-[300px] bg-white dark:bg-[#0f0f0f] flex flex-col shadow-2xl lg:hidden"
        style={{
          transform: openNav ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-gray-100 dark:border-gray-800 shrink-0">
          <Link to="/" onClick={closeNav}
            className="text-xl font-extrabold text-[#155dfc] leading-none"
          >
            <span className="text-gray-900 dark:text-white font-serif">Nova</span>Shop
          </Link>
          <button onClick={closeNav} aria-label="Close menu"
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[#155dfc] hover:text-white transition-colors"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Scrollable nav area */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} onClick={closeNav}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#155dfc] text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-[#155dfc]/10 hover:text-[#155dfc]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            {/* Cart */}
            <Link to="/cart"
              onClick={(e) => { handleCartClick(e); closeNav(); }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl border-2 border-[#155dfc] text-[#155dfc] font-semibold text-sm hover:bg-[#155dfc] hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2"><IoCartOutline size={18} /> My Cart</span>
              {cartItem.length > 0 && (
                <span className="bg-[#155dfc] text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {cartItem.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" onClick={closeNav}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              <IoHeartOutline size={16} /> My Wishlist
            </Link>

            {/* Theme */}
            <button onClick={toggleDark}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Auth */}
            <div className="flex justify-center pt-1">
              <SignedOut>
                <SignInButton mode="modal">
                  <button onClick={closeNav}
                    className="w-full bg-[#155dfc] text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-[#1249d4] transition-colors"
                  >
                    Sign In / Sign Up
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-col items-center gap-1.5">
                  <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-11 h-11" } }} />
                  <span className="text-[11px] text-gray-400">Tap to manage account</span>
                </div>
              </SignedIn>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
