import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        setOrders(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order._id === id
              ? { ...order, status }
              : order
          )
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        'Failed to update order status'
      );
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 p-[30px] bg-zinc-900 rounded-xl border border-white/5 text-zinc-50">

      {/* Heading */}
      <h2 className="text-orange-500 text-2xl font-bold mb-5">
        Manage Orders
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/10">

              <th className="p-[15px] text-left text-zinc-400 text-sm">
                ORDER ID
              </th>

              <th className="p-[15px] text-left text-zinc-400 text-sm">
                USER
              </th>

              <th className="p-[15px] text-left text-zinc-400 text-sm">
                TOTAL
              </th>

              <th className="p-[15px] text-left text-zinc-400 text-sm">
                DATE
              </th>

              <th className="p-[15px] text-left text-zinc-400 text-sm">
                STATUS
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b border-white/10"
              >

                {/* Order ID */}
                <td className="p-[15px] text-left">
                  {order._id.substring(0, 8)}...
                </td>

                {/* User */}
                <td className="p-[15px] text-left">
                  {order.userId?.name || 'Deleted User'}
                </td>

                {/* Total */}
                <td className="p-[15px] text-left">
                  ₹{order.totalAmount.toFixed(2)}
                </td>

                {/* Date */}
                <td className="p-[15px] text-left">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* Status */}
                <td className="p-[15px] text-left">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="bg-zinc-950 text-white px-2 py-1.5 border border-zinc-800 rounded-md outline-none focus:border-orange-500"
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminOrders;