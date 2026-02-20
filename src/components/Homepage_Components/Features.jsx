import { memo } from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = memo(() => {
  return (
    <section className="bg-[#efeeea] dark:bg-[#080d10] py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h2 className="mb-8 sm:mb-10 md:mb-12 text-3xl font-extrabold md:text-4xl text-center text-black dark:text-white px-4">
        Why Shop <span className="text-[#155dfc]">With Us</span>
      </h2>

      <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-[#7daaf41d] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border border-[#155dfc] transition-all duration-300 bg-transparent rounded-xl sm:rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105"
              >
                {/* Icon */}
                <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-[#155dfc]/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <Icon
                    className="h-5 w-5 sm:h-6 sm:w-6 text-[#155dfc]"
                    aria-hidden="true"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-black dark:text-[#d6fff1] truncate">
                    {feature.text}
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-[#7eaccb] line-clamp-2">
                    {feature.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;
