import { memo } from "react";
import Banner2 from "../../assets/Banner2.avif";
import { HiArrowRight } from "react-icons/hi2";

const MidBanner = memo(() => {
  return (
    <section className="bg-[#eae4d5] dark:bg-[#060509] py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* CARD */}
        <div className="relative overflow-hidden rounded-3xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#0b0f14] shadow-2xl">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <span className="inline-block w-fit mb-4 px-4 py-1 text-xs font-semibold tracking-widest rounded-full bg-[#155dfc]/10 text-[#155dfc]">
              TRENDING NOW
            </span>

            <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl dark:text-white">
              Smart Tech  
              <span className="block text-[#155dfc]">
                Built for the Future
              </span>
            </h2>

            <p className="max-w-md mt-5 text-sm text-gray-600 sm:text-base dark:text-gray-400">
              Experience next-generation electronics with premium
              design, lightning performance and unbeatable value.
            </p>

            {/* CTA */}
            <button className="mt-8 w-fit flex items-center gap-2 bg-[#155dfc] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl">
              Explore Products
              <HiArrowRight />
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
            <img
              src={Banner2}
              alt="Mid Banner"
              loading="lazy"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

MidBanner.displayName = 'MidBanner';

export default MidBanner;
