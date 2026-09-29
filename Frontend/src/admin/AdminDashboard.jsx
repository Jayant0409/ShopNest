import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/analytics', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setStats(data);
        } else {
          if (response.status === 401) {
            navigate('/login');
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-[1000px] p-5">

      {/* Header */}
      <div className="mb-1 flex items-center gap-[15px]">
        <img
          src="/ShoppingBaazi.png"
          alt="Logo"
          className="
            h-10 w-10 rounded-lg object-cover
            
          "
        />

        <h2 className="mb-0 text-[2.2rem] font-bold">
          Admin Dashboard
        </h2>
      </div>

      {/* Welcome Message */}
      <p className="mb-[30px] text-[1.1rem] text-zinc-400">
        Welcome back,{' '}
        <span className="text-white">
          {user?.name}
        </span>
      </p>

      {/* Statistics */}
      {stats ? (
        <div
          className="
            grid
            grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
            gap-5
          "
        >

          {/* Total Orders */}
          <div
            className="
              flex flex-col justify-center gap-[10px]
              rounded-xl
              border border-white/[0.05]
              bg-zinc-900
              p-[25px]
              text-center
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            "
          >
            <h4 className="text-base font-semibold text-zinc-400">
              Total Orders
            </h4>

            <div className="text-[2.5rem] font-bold text-orange-500">
              {stats.totalOrders}
            </div>
          </div>

          {/* Total Products */}
          <div
            className="
              flex flex-col justify-center gap-[10px]
              rounded-xl
              border border-white/[0.05]
              bg-zinc-900
              p-[25px]
              text-center
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            "
          >
            <h4 className="text-base font-semibold text-zinc-400">
              Total Products
            </h4>

            <div className="text-[2.5rem] font-bold text-orange-500">
              {stats.totalProducts}
            </div>
          </div>

          {/* Total Users */}
          <div
            className="
              flex flex-col justify-center gap-[10px]
              rounded-xl
              border border-white/[0.05]
              bg-zinc-900
              p-[25px]
              text-center
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            "
          >
            <h4 className="text-base font-semibold text-zinc-400">
              Total Users
            </h4>

            <div className="text-[2.5rem] font-bold text-orange-500">
              {stats.totalUsers}
            </div>
          </div>

          {/* Total Revenue */}
          <div
            className="
              flex flex-col justify-center gap-[10px]
              rounded-xl
              border border-white/[0.05]
              bg-zinc-900
              p-[25px]
              text-center
              shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            "
          >
            <h4 className="text-base font-semibold text-zinc-400">
              Total Revenue
            </h4>

            <div className="text-[2.5rem] font-bold text-orange-500">
              ₹{stats.totalRevenue.toFixed(2)}
            </div>
          </div>

        </div>
      ) : (
        <div className="my-[50px] text-center text-orange-500">
          Loading metrics...
        </div>
      )}

      {/* Administrative Controls */}
      <div
        className="
          mt-10
          rounded-xl
          border border-white/[0.05]
          bg-zinc-900
          p-[30px]
        "
      >
        <h3 className="mb-[25px] text-[1.5rem] font-bold text-orange-500">
          Administrative Controls
        </h3>

        <div className="flex flex-wrap gap-5">

          {/* Add Product */}
          <button
            onClick={() => navigate('/admin/add-product')}
            className="
              cursor-pointer
              rounded-lg
              bg-gradient-to-br from-orange-500 to-orange-600
              px-6 py-3
              font-semibold
              text-white
              shadow-[0_4px_14px_rgba(234,88,12,0.3)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:brightness-110
              hover:shadow-[0_6px_20px_rgba(234,88,12,0.5)]
            "
          >
            + Add Product
          </button>

          {/* Manage Products */}
          <button
            onClick={() => navigate('/admin/products')}
            className="
              cursor-pointer
              rounded-lg
              bg-zinc-700
              px-6 py-3
              font-semibold
              text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-zinc-600
            "
          >
            📦 Manage Products
          </button>

          {/* Manage Orders */}
          <button
            onClick={() => navigate('/admin/orders')}
            className="
              cursor-pointer
              rounded-lg
              bg-zinc-700
              px-6 py-3
              font-semibold
              text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-zinc-600
            "
          >
            🚚 Manage Orders
          </button>

          {/* Users Directory */}
          <button
            onClick={() => navigate('/admin/users')}
            className="
              cursor-pointer
              rounded-lg
              bg-zinc-700
              px-6 py-3
              font-semibold
              text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-zinc-600
            "
          >
            👥 Users Directory
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;