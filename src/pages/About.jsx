import { Link } from "react-router-dom";

const stats = [
  { value: "10K+",  label: "Products" },
  { value: "50K+",  label: "Happy Customers" },
  { value: "4.9", label: "Avg. Rating" },
];

const whyUs = [
  "Top-quality products from trusted brands",
  "Lightning-fast and secure shipping",
  "Reliable and friendly customer support",
  "Easy returns & hassle-free experience",
];

const About = () => {
  return (
    // Single CSS fadeIn — no library, zero lag
    <div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#111] dark:to-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-16"
      style={{ animation: "fadeUp 0.4s ease-out both" }}
    >
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-black/50 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl p-6 sm:p-10 space-y-8">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 dark:text-white">
          About <span className="text-[#155dfc]">NovaShop</span>
        </h1>

        {/* Intro */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
          Welcome to <span className="font-semibold text-[#155dfc]">NovaShop</span> — your one-stop destination
          for the latest electronics. From cutting-edge gadgets to must-have accessories,
          we power up your tech life with premium products and unbeatable service.
        </p>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Our Mission",
              text: "Make innovative technology accessible to everyone. We connect people with tools they need to thrive in a digital world — at competitive prices, delivered with care.",
            },
            {
              title: "Our Vision",
              text: "A future where technology elevates everyday life. NovaShop stays ahead of the curve with practical, modern and affordable tech solutions for everyone.",
            },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-[#155dfc] mb-3">{item.title}</h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Why choose us */}
        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-[#155dfc] mb-4">Why Choose NovaShop?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyUs.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#155dfc] shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-2 rounded-2xl bg-[#155dfc]/5 dark:bg-[#155dfc]/10 border border-[#155dfc]/20">
              <div className="text-xl sm:text-3xl font-extrabold text-[#155dfc]">{s.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#155dfc] mb-2">Join the NovaShop Family</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Whether you're a tech enthusiast or just exploring — there's something for everyone.
          </p>
          <Link to="/products">
            <button className="px-8 py-3 rounded-xl font-semibold text-white bg-[#155dfc] hover:bg-[#1249d4] shadow-lg shadow-[#155dfc]/25">
              Start Shopping 🚀
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;