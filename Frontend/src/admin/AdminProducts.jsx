import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');

        setProducts(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.status === 200) {
          setProducts(
            products.filter((product) => product._id !== id)
          );
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="mx-auto my-10 max-w-[1200px] rounded-xl border border-white/5 bg-zinc-900 p-[30px] text-zinc-50">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-500">
          Manage Products
        </h2>

        <Link
          to="/admin/add-product"
          className="rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-[15px] text-left text-sm font-semibold text-zinc-400">
                ID
              </th>

              <th className="p-[15px] text-left text-sm font-semibold text-zinc-400">
                NAME
              </th>

              <th className="p-[15px] text-left text-sm font-semibold text-zinc-400">
                PRICE
              </th>

              <th className="p-[15px] text-left text-sm font-semibold text-zinc-400">
                CATEGORY
              </th>

              <th className="p-[15px] text-left text-sm font-semibold text-zinc-400">
                STOCK
              </th>

              <th className="p-[15px] text-left text-sm font-semibold text-zinc-400">
                ACTIONS
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-white/10 transition hover:bg-white/[0.03]"
              >
                {/* ID */}
                <td className="p-[15px] text-left text-zinc-300">
                  {product._id.substring(0, 8)}...
                </td>

                {/* Name */}
                <td className="p-[15px] text-left font-medium text-white">
                  {product.name}
                </td>

                {/* Price */}
                <td className="p-[15px] text-left font-semibold text-orange-500">
                  ₹{product.price.toFixed(2)}
                </td>

                {/* Category */}
                <td className="p-[15px] text-left text-zinc-300">
                  {product.category}
                </td>

                {/* Stock */}
                <td className="p-[15px] text-left text-zinc-300">
                  {product.stock}
                </td>

                {/* Actions */}
                <td className="p-[15px] text-left">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="mr-2 inline-block rounded bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="rounded bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* No Products */}
      {products.length === 0 && (
        <p className="py-10 text-center text-zinc-400">
          No products found.
        </p>
      )}
    </div>
  );
};

export default AdminProducts;