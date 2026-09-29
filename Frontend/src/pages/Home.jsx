import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');

        setProducts(response.data.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="
          relative
          mb-[50px]
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.05]
          bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_60%),linear-gradient(135deg,#18181b_0%,#09090b_100%)]
          px-[30px]
          py-[100px]
          text-center
          text-white
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        "
      >
        <h1
          className="
            mb-5
            text-[3.5rem]
            font-bold
            text-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
          "
        >
          Welcome to ShopNest
        </h1>

        <p className="text-[1.2rem] text-zinc-300">
          Discover the best products at unbeatable prices.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-white">
        Featured Products
      </h2>

      {loading ? (
        <div className="mt-5 text-orange-500">
          Loading...
        </div>
      ) : (
        <div
          className="
            mt-[30px]
            grid
            grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
            gap-[30px]
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;