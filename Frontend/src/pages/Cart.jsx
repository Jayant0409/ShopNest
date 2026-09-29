import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="mx-auto max-w-[1200px]">
      <h2 className="mb-5 text-[2.2rem] font-bold tracking-[-0.5px] text-white">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-zinc-400">
          Your cart is empty.{' '}
          <Link
            to="/shop"
            className="font-semibold text-orange-500 hover:underline"
          >
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="mt-[30px] flex gap-10 max-md:flex-col">

          {/* Cart Items */}
          <div className="flex flex-2 flex-col gap-5">

            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="
                  flex items-center rounded-xl border border-white/5
                  bg-zinc-900 p-5
                  shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                  transition-all duration-300
                  hover:translate-x-[5px]
                  hover:border-orange-500/20
                  max-sm:flex-col
                  max-sm:items-start
                "
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="
                    mr-[30px] h-[120px] w-[120px]
                    rounded-lg object-cover
                    max-sm:mb-4 max-sm:mr-0
                  "
                />

                {/* Product Details */}
                <div className="flex-1">

                  <h4 className="mb-[15px] text-[1.2rem] font-bold text-white">
                    {item.name}
                  </h4>

                  <p className="text-orange-500">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="my-[15px] flex items-center gap-[15px]">

                    <button
                      onClick={() =>
                        handleUpdateQty(item, item.qty - 1)
                      }
                      className="
                        flex h-8 w-8 cursor-pointer items-center
                        justify-center rounded-md
                        border border-zinc-700
                        bg-zinc-800 text-white
                        transition-all duration-200
                        hover:border-orange-500
                        hover:bg-orange-500
                      "
                    >
                      -
                    </button>

                    <span className="text-[1.1rem] font-semibold text-white">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQty(item, item.qty + 1)
                      }
                      className="
                        flex h-8 w-8 cursor-pointer items-center
                        justify-center rounded-md
                        border border-zinc-700
                        bg-zinc-800 text-white
                        transition-all duration-200
                        hover:border-orange-500
                        hover:bg-orange-500
                      "
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="
                      cursor-pointer rounded-md
                      border border-red-500/30
                      bg-red-500/10
                      px-4 py-2
                      font-semibold text-red-500
                      transition-all duration-300
                      hover:bg-red-500
                      hover:text-white
                    "
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* Cart Summary */}
          <div
            className="
              sticky top-[100px] h-fit flex-1
              rounded-xl border border-white/5
              bg-zinc-900 p-[30px]
              shadow-[0_4px_20px_rgba(0,0,0,0.2)]
              max-md:static
              max-md:w-full
            "
          >

            <h3
              className="
                mb-[25px]
                border-b border-white/10
                pb-[15px]
                text-[1.8rem]
                font-bold
                text-white
              "
            >
              Total: ₹{totalPrice.toFixed(2)}
            </h3>

            <button
              onClick={() => navigate('/checkout')}
              className="
                w-full cursor-pointer
                rounded-lg
                bg-gradient-to-br from-orange-500 to-orange-600
                px-6 py-[15px]
                text-[1.1rem]
                font-semibold
                tracking-[0.5px]
                text-white
                shadow-[0_4px_14px_rgba(234,88,12,0.3)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:brightness-110
                hover:shadow-[0_6px_20px_rgba(234,88,12,0.5)]
              "
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;