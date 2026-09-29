import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div
      className="
        group relative flex flex-col overflow-hidden rounded-xl
        border border-white/[0.03]
        bg-[#18181b]
        shadow-[0_4px_20px_rgba(0,0,0,0.3)]
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(249,115,22,0.3)]
      "
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="
          h-60 w-full object-cover
          transition-transform duration-500
          group-hover:scale-105
        "
      />

      <div
        className="
          relative z-[2] flex flex-1 flex-col
          justify-between
          bg-gradient-to-t from-[#18181b] from-80% to-transparent
          p-5
          text-left
        "
      >
        <h3
          className="
            mb-2.5 overflow-hidden
            text-lg
            text-white
            text-ellipsis whitespace-nowrap
          "
        >
          {product.name}
        </h3>

        <p className="mb-4 text-xl font-bold text-orange-500">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;