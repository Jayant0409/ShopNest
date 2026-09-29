import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Page Heading */}
      <h2 className="mb-5 text-3xl font-bold text-white">
        All Products
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          mb-[30px]
          w-full
          max-w-[500px]
          rounded-lg
          border border-[#27272a]
          bg-[#18181b]
          px-5 py-[15px]
          text-base
          text-[#fafafa]
          outline-none
          transition-all
          duration-300
          placeholder:text-zinc-500
          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-500/10
        "
      />

      {/* Products */}
      {loading ? (
        <div className="text-orange-500">
          Loading...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-10 text-center text-zinc-400">
          No products found.
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
          {filteredProducts.map((product) => (
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

export default Shop;