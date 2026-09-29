import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: 1,
        })
      );

      alert('Successfully added to your cart!');
    }
  };

  if (loading) {
    return (
      <div className="m-[100px] text-center text-orange-500">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="m-[100px] text-center text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-5">

      {/* Breadcrumb Navigation */}
      <div className="mb-5 text-[0.95rem] text-zinc-400">
        <Link
          to="/"
          className="text-orange-500"
        >
          Home
        </Link>

        {' / '}

        <Link
          to="/shop"
          className="text-orange-500"
        >
          Shop
        </Link>

        {' / '}

        {product.category}

        {' / '}

        <span className="text-white">
          {product.name}
        </span>
      </div>

      {/* Product Detail */}
      <div
        className="
          grid
          grid-cols-2
          gap-[50px]
          rounded-2xl
          border
          border-[#27272a]
          bg-[#18181b]
          p-10
          max-[900px]:grid-cols-1
        "
      >

        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              w-full
              rounded-xl
              object-cover
              shadow-[0_10px_30px_rgba(0,0,0,0.5)]
            "
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">

          <h2 className="mb-[10px] text-[2.8rem] text-white">
            {product.name}
          </h2>

          <p
            className="
              my-[15px]
              mb-[25px]
              text-[2.5rem]
              font-bold
              text-orange-500
            "
          >
            ₹{product.price.toFixed(2)}
          </p>

          {/* Description */}
          <div className="mb-[25px]">

            <h4 className="mb-[10px] text-white">
              Product Description
            </h4>

            <p className="mb-[30px] text-[1.1rem] leading-[1.7] text-zinc-400">
              {product.description}
            </p>

          </div>

          {/* Add To Cart */}
          <div className="flex items-center gap-5">

            <button
              onClick={handleAddToCart}
              className="
                flex-grow
                cursor-pointer
                rounded-lg
                bg-orange-500
                p-[18px]
                text-[1.2rem]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-orange-600
              "
            >
              Add to Shopping Cart
            </button>

          </div>

          {/* Stock Status */}
          <p
            className={`mt-5 font-semibold ${
              product.stock > 0
                ? 'text-emerald-500'
                : 'text-red-500'
            }`}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : '● Temporarily Out of Stock'}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;