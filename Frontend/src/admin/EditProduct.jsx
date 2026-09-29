import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);

        const data = response.data;

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock
        });
      } catch (error) {
        console.error(error);
        alert(
          error.response?.data?.message ||
          'Failed to fetch product'
        );
      }
    };

    fetchProduct();
  }, [id]);

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);

    // Image is optional during editing
    if (image) {
      data.append('image', image);
    }

    try {
      const response = await axios.put(
        `/api/products/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      if (response.status === 200) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        'Failed to update product'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-10 bg-zinc-900 p-10 rounded-xl border border-white/5">

      {/* Heading */}
      <h2 className="text-orange-500 text-2xl font-bold mb-5">
        Edit Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
          className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] outline-none focus:border-orange-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          required
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value
            })
          }
          className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] outline-none focus:border-orange-500 resize-none"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          required
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value
            })
          }
          className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] outline-none focus:border-orange-500"
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value
            })
          }
          className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] outline-none focus:border-orange-500"
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          required
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: e.target.value
            })
          }
          className="p-3 bg-zinc-950 border border-zinc-800 rounded-md text-white text-[15px] outline-none focus:border-orange-500"
        />

        {/* Image */}
        <div className="p-4 border border-dashed border-orange-500 rounded-lg">

          <label className="block mb-3 text-zinc-400">
            Replace Image (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer"
          />

        </div>

        {/* Update Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-[15px] cursor-pointer hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>

      </form>
    </div>
  );
};

export default EditProduct;