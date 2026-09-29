import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div
      className="
        mx-auto my-[50px]
        max-w-[600px]
        rounded-2xl
        border border-white/[0.05]
        bg-[#18181b]
        px-[30px] py-[50px]
        text-center
        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
      "
    >
      <h2
        className="
          mb-5
          text-[2.5rem]
          font-bold
          text-[#10b981]
        "
      >
        Payment Successful!
      </h2>

      <p
        className="
          mb-10
          text-[1.2rem]
          leading-[1.8]
          text-[#a1a1aa]
        "
      >
        Thank you for your order. We have securely received your payment
        and will process your shipment shortly.
      </p>

      <Link
        to="/shop"
        className="
          inline-block
          rounded-lg
          bg-gradient-to-br from-orange-500 to-orange-600
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
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;