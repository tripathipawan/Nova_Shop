import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { IoCartOutline } from 'react-icons/io5'

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <article className="p-3 mt-2 space-y-4 rounded-md shadow-md bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-7">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width="288"
          height="192"
          decoding="async"
          className="object-cover w-full h-48 rounded-md cursor-pointer md:w-60 md:h-40 lg:w-72 lg:h-48"
          onClick={() => navigate(`/products/${product.id}`)}
          onError={(e) => { e.currentTarget.src = "https://placehold.co/288x192"; }}
        />

        {/* DETAILS SECTION */}
        <div className="flex-1 w-full space-y-2">
          <h3
            className="font-bold text-lg md:text-xl line-clamp-3 text-[#000] dark:text-[#fff] cursor-pointer hover:text-[#155dfc] transition-colors"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.title}
          </h3>

          <p className="font-semibold text-sm md:text-lg flex items-center gap-1 text-[#000] dark:text-[#fff]">
            ₹<span className="text-3xl md:text-4xl">{product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ({Math.round(product.discountPercentage)}% OFF)
              </span>
            )}
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-400">
            FREE delivery{" "}
            <span className="font-semibold">Fri, 18 Apr</span><br />
            Or fastest delivery{" "}
            <span className="font-semibold">Tomorrow, 17 Apr</span>
          </p>
          <button
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.title} to cart`}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-md w-full md:w-auto flex items-center gap-2 font-semibold text-sm ${
              product.stock === 0
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-[#155dfc] text-white hover:bg-[#1249d4] transition-colors"
            }`}
          >
            <IoCartOutline size={16} aria-hidden="true" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

      </div>
    </article>
  )
}

export default ProductListView