const buildPages = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

const Pagination = ({ page, pageHandler, dynamicPage: total }) => {
  if (!total || total <= 1) return null;
  const pages = buildPages(page, total);

  const btnBase =
    "min-w-[36px] h-9 rounded-lg text-sm font-semibold border transition-colors duration-150 flex items-center justify-center px-2";

  return (
    // KEY FIX: flex + justify-center centers everything
    <div className="flex items-center justify-center gap-1.5 py-6 flex-wrap">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`${btnBase} px-3 gap-1 ${
          page === 1
            ? "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed bg-white dark:bg-[#1a1a1a]"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-[#155dfc] hover:text-white hover:border-[#155dfc]"
        }`}
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`d${i}`} className="w-8 text-center text-gray-400 text-sm select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => pageHandler(p)}
            className={`${btnBase} ${
              p === page
                ? "bg-[#155dfc] text-white border-[#155dfc] shadow-sm"
                : "bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#155dfc]/10 hover:text-[#155dfc] hover:border-[#155dfc]/50"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={page === total}
        onClick={() => pageHandler(page + 1)}
        className={`${btnBase} px-3 gap-1 ${
          page === total
            ? "border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed bg-white dark:bg-[#1a1a1a]"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 hover:bg-[#155dfc] hover:text-white hover:border-[#155dfc]"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
