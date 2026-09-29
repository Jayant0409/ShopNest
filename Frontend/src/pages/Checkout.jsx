import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const orderResponse = await axios.post('/api/payment/order', {
        amount: totalPrice,
      });

      const orderData = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              '/api/payment/verify',
              response
            );

            if (verifyResponse.status === 200) {
              // Save order
              const saveOrderResponse = await axios.post(
                '/api/orders',
                {
                  items: cartItems,
                  totalAmount: totalPrice,
                  address,
                  paymentId: response.razorpay_payment_id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );

              if (saveOrderResponse.status === 200 || saveOrderResponse.status === 201) {
                dispatch(clearCart());
                navigate('/ordersuccess');
              } else {
                alert('Order saving failed');
              }
            }
          } catch (error) {
            console.error(error);

            if (error.response) {
              alert(
                error.response.data?.message ||
                'Payment verification failed'
              );
            } else {
              alert('Payment verification failed');
            }
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999',
        },

        theme: {
          color: '#f97316',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } 
    
    catch (error) {
      console.error(error);

      // Razorpay unconfigured exception handler
      const fallback = window.confirm(
        'Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?'
      );

      if (fallback) {
        await bypassPayment();
      } else {
        alert('Payment failed to initialize');
      }
    }
  };

  const bypassPayment = async () => {
    try {
      const response = await axios.post(
        '/api/orders',
        {
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId: 'bypass_txn_' + Date.now(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(clearCart());
        navigate('/ordersuccess');
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        'Failed to place order'
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    handlePayment();
  };

  return (
    <div className="mx-auto max-w-[1200px]">

      <h2 className="mb-5 text-[2.2rem] font-bold tracking-[-0.5px] text-white">
        Checkout
      </h2>

      <div
        className="
          mx-auto max-w-[600px]
          rounded-xl
          border border-white/5
          bg-zinc-900
          p-10
        "
      >

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px]"
        >

          <h3 className="mb-2 text-[1.5rem] font-bold text-white">
            Shipping Address
          </h3>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value,
              })
            }
            className="
              rounded-lg
              border border-zinc-800
              bg-zinc-950
              p-[15px]
              text-[15px]
              text-white
              outline-none
              placeholder:text-zinc-500
              focus:border-orange-500
            "
          />

          {/* Street */}
          <input
            type="text"
            placeholder="Street"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value,
              })
            }
            className="
              rounded-lg
              border border-zinc-800
              bg-zinc-950
              p-[15px]
              text-[15px]
              text-white
              outline-none
              placeholder:text-zinc-500
              focus:border-orange-500
            "
          />

          {/* City */}
          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
            className="
              rounded-lg
              border border-zinc-800
              bg-zinc-950
              p-[15px]
              text-[15px]
              text-white
              outline-none
              placeholder:text-zinc-500
              focus:border-orange-500
            "
          />

          {/* Postal Code */}
          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({
                ...address,
                postalCode: e.target.value,
              })
            }
            className="
              rounded-lg
              border border-zinc-800
              bg-zinc-950
              p-[15px]
              text-[15px]
              text-white
              outline-none
              placeholder:text-zinc-500
              focus:border-orange-500
            "
          />

          {/* Country */}
          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({
                ...address,
                country: e.target.value,
              })
            }
            className="
              rounded-lg
              border border-zinc-800
              bg-zinc-950
              p-[15px]
              text-[15px]
              text-white
              outline-none
              placeholder:text-zinc-500
              focus:border-orange-500
            "
          />

          {/* Checkout Summary */}
          <div
            className="
              mt-[30px]
              border-t border-white/10
              pt-5
              text-right
            "
          >

            <h4 className="mb-5 text-[1.5rem] font-bold text-orange-500">
              Total to Pay: ₹{totalPrice.toFixed(2)}
            </h4>

            <button
              type="submit"
              className="
                inline-block
                cursor-pointer
                rounded-lg
                border-none
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
              Pay Now
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;