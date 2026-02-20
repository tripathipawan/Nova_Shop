import { memo } from "react";
import { useNavigate } from "react-router-dom";

const useCases = [
  {
    title: "For Gaming",
    desc: "High performance & low latency",
    color: "from-[#155dfc] to-[#ff9a6b]",
    path: "/products",
  },
  {
    title: "For Office",
    desc: "Reliable & productivity focused",
    color: "from-[#155dfc] to-[#5de0c0]",
    path: "/products",
  },
  {
    title: "For Students",
    desc: "Affordable & everyday essentials",
    color: "from-[#667eea] to-[#764ba2]",
    path: "/products",
  },
  {
    title: "For Home",
    desc: "Smart & daily-use electronics",
    color: "from-[#f7971e] to-[#ffd200]",
    path: "/products",
  },
];

const UseCaseSection = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#efeeea] dark:bg-[#080d10] py-16">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-12 text-3xl font-extrabold md:text-4xl text-center text-black dark:text-white">
          Shop by <span className="text-[#155dfc]">Use Case</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="relative rounded-3xl p-6 text-left bg-white dark:bg-[#0f141a] border border-black/10 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              {/* top accent */}
              <div
                className={`h-1 w-14 rounded-full mb-5 bg-gradient-to-r ${item.color} transition-all duration-300 group-hover:w-24`}
              />

              <h3 className="text-lg font-semibold text-black dark:text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>

              <span className="inline-block mt-4 text-sm font-semibold text-[#155dfc]">
                Explore →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

UseCaseSection.displayName = 'UseCaseSection';

export default UseCaseSection;
