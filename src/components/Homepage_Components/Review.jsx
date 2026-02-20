import { memo } from "react";

const reviews = [
  {
    name: "Kulvinder Kumar Khurashi",
    role: "Verified Buyer",
    review:
      "Product quality is excellent and delivery was super fast. Definitely ordering again!",
    rating: 5,
  },
  {
    name: "Mohd. Kunal Yadav",
    role: "Happy Customer",
    review:
      "Customer support was very helpful and the product looks exactly like shown.",
    rating: 4,
  },
  {
    name: "Aamir Tripathi",
    role: "Regular User",
    review:
      "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 5,
  },
  {
    name: "Ram Khan",
    role: "Regular User",
    review:
      "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 3,
  },
  {
    name: "Dr. Aarti Salmani",
    role: "Happy Customer",
    review:
      "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 5,
  },
  {
    name: "Pawan Tripathi",
    role: "Mad Builder",
    review:
      "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 5,
  },
];

const Reviews = memo(() => {
  return (
    <section className="bg-[#efeeea] dark:bg-[#080d10] py-10">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-12 text-3xl font-extrabold md:text-4xl text-center text-black dark:text-white">
          What Our <span className="text-[#155dfc]">Customers Say</span>
        </h2>

        {/* Reviews Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="p-6 transition-all duration-300 bg-white border dark:bg-black border-black/10 dark:border-white/25 rounded-2xl hover:shadow-lg hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} className="text-[#fcb715] text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Review text */}
              <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                "{item.review}"
              </p>

              {/* User */}
              <div>
                <h4 className="font-semibold text-[#155dfc] text-sm">
                  {item.name}
                </h4>
                <span className="text-xs text-[#155efc9a]">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews;
