import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

const fetchMyOrders = async () => {
  try {
    const response = await axios.get('/api/orders/myOrders', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setOrders(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error(error);

    if (error.response?.status === 401) {
      logout();
      navigate('/login');
    }

    setOrders([]);
  } finally {
    setLoading(false);
  }
};

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div
      className="
        mx-auto my-10
        max-w-[1000px]
        rounded-xl
        border border-white/[0.05]
        bg-[#18181b]
        p-[30px]
        text-[#fafafa]
      "
    >
      {/* Profile Header */}
      <div
        className="
          mb-[30px]
          flex
          flex-col
          gap-5
          border-b border-white/10
          pb-[30px]
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div>
          <h2
            className="
              mb-2.5
              text-[2.2rem]
              font-bold
              text-white
            "
          >
            My Profile
          </h2>

          <p className="mb-1 text-[1.2rem] text-[#a1a1aa]">
            <strong className="text-white">Name:</strong> {user.name}
          </p>

          <p className="mb-[15px] text-[1.2rem] text-[#a1a1aa]">
            <strong className="text-white">Email:</strong> {user.email}
          </p>

          {/* Account Type */}
          <span
            className="
              inline-block
              rounded-lg
              bg-orange-500/10
              px-3 py-1.5
              text-[0.9rem]
              font-bold
              text-orange-500
            "
          >
            Account Type: {user.role.toUpperCase()}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            rounded-lg
            bg-red-500
            px-6 py-3
            font-semibold
            text-white
            transition
            duration-300
            hover:bg-red-600
            hover:-translate-y-0.5
          "
        >
          Logout
        </button>
      </div>

      {/* Order History Heading */}
      <h3
        className="
          mb-5
          text-[1.5rem]
          font-bold
          text-orange-500
        "
      >
        Order History
      </h3>

      {/* Loading */}
      {loading ? (
        <p className="text-[#a1a1aa]">
          Fetching your orders...
        </p>
      ) : orders.length === 0 ? (
        /* No Orders */
        <div
          className="
            rounded-lg
            border border-[#27272a]
            bg-[#09090b]
            p-[30px]
            text-center
          "
        >
          <p className="mb-[15px] text-[#a1a1aa]">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="
              inline-block
              rounded-lg
              bg-gradient-to-br
              from-orange-500
              to-orange-600
              px-6 py-3
              text-[15px]
              font-semibold
              text-white
              shadow-[0_4px_14px_rgba(234,88,12,0.3)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:brightness-110
              hover:shadow-[0_6px_20px_rgba(234,88,12,0.5)]
            "
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        /* Orders */
        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-5
                rounded-xl
                border border-[#27272a]
                bg-[#09090b]
                p-5
              "
            >
              {/* Order Information */}
              <div>
                <p className="mb-1 text-[0.9rem] text-[#a1a1aa]">
                  Order ID:{' '}
                  <span className="text-white">
                    {order._id}
                  </span>
                </p>

                <p className="mb-1 text-[0.9rem] text-[#a1a1aa]">
                  Placed On:{' '}
                  <span className="text-white">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p className="text-[0.9rem] text-[#a1a1aa]">
                  Total:{' '}
                  <strong className="text-[#10b981]">
                    ₹{order.totalAmount.toFixed(2)}
                  </strong>
                </p>
              </div>

              {/* Order Status */}
              <div>
                <span
                  className={`
                    inline-block
                    rounded-full
                    px-4 py-2
                    font-bold
                    ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : order.status === 'Shipped'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-amber-500/10 text-amber-500'
                    }
                  `}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;