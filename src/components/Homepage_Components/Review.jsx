import { memo } from "react";

const reviews = [
  {
    name: "Kulvinder Kumar Khurashi",
    role: "Verified Buyer",
    review: "Product quality is excellent and delivery was super fast. Definitely ordering again!",
    rating: 5,
  },
  {
    name: "Mohd. Kunal Yadav",
    role: "Happy Customer",
    review: "Customer support was very helpful and the product looks exactly like shown.",
    rating: 4,
  },
  {
    name: "Aamir Tripathi",
    role: "Regular User",
    review: "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 5,
  },
  {
    name: "Ram Khan",
    role: "Regular User",
    review: "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 3,
  },
  {
    name: "Dr. Aarti Salmani",
    role: "Happy Customer",
    review: "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 5,
  },
  {
    name: "Pawan Tripathi",
    role: "Mad Builder",
    review: "Value for money. UI of the website is smooth and checkout was easy.",
    rating: 5,
  },
];

/* GEO structured data for reviews */
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: reviews.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author:      { "@type": "Person", name: r.name },
      reviewBody:  r.review,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      itemReviewed: { "@type": "Store", name: "NovaShop" },
    },
  })),
};

const Reviews = memo(() => {
  return (
    <section aria-labelledby="reviews-heading" className="bg-[#efeeea] dark:bg-[#080d10] py-10">
      {/* Inline structured data for AI/search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="px-4 mx-auto max-w-7xl">
        <h2
          id="reviews-heading"
          className="mb-12 text-3xl font-extrabold md:text-4xl text-center text-black dark:text-white"
        >
          What Our <span className="text-[#155dfc]">Customers Say</span>
        </h2>

        {/* ✅ FIX: Removed role="list" + role="listitem" on <article> — conflicting/prohibited ARIA.
            Using <ul>/<li> which are natively list elements instead. */}
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Customer reviews"
        >
          {reviews.map((item) => (
            <li key={item.name}>
              <article className="p-6 h-full transition-all duration-300 bg-white border dark:bg-black border-black/10 dark:border-white/25 rounded-2xl hover:shadow-lg hover:-translate-y-1">

                {/* Stars */}
                <div
                  className="flex mb-3"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < item.rating ? "text-[#fcb715]" : "text-gray-300"}`}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review text */}
                <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  &ldquo;{item.review}&rdquo;
                </p>

                {/* Reviewer */}
                <div>
                  <h3 className="font-semibold text-[#155dfc] text-sm">{item.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.role}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

Reviews.displayName = "Reviews";
export default Reviews;