import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <div className="p-3 mt-2 space-y-4 rounded-md shadow-md bg-whit dark:bg-gray-900">

      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-7">

        {/* IMAGE SECTION */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-48 rounded-md cursor-pointer md:w-60 md:h-40 lg:w-72 lg:h-48"
          onClick={() => navigate(`/products/${product.id}`)}
        />

        {/* DETAILS SECTION */}
        <div className="flex-1 w-full space-y-2">

          <h1 className="font-bold text-lg md:text-xl line-clamp-3 text-[#000] dark:text-[#fff]">
            {product.title}
          </h1>

          <p className="font-semibold text-sm md:text-lg flex items-center gap-1 text-[#000] dark:text-[#fff]">
            ₹<span className="text-3xl md:text-4xl">{product.price}</span>
            <span className="text-sm text-green-600">
              ({product.discount}% OFF)
            </span>
          </p>

          <p className="text-sm text-[#000] dark:text-[#676767]">
            FREE delivery  
            <span className="font-semibold"> Fri, 18 Apr</span><br />
            Or fastest delivery  
            <span className="font-semibold"> Tomorrow, 17 Apr</span>
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#155dfc] text-white px-4 py-2 rounded-md w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>

      </div>

    </div>
  )
}

export default ProductListView