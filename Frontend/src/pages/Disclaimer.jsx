import React from 'react';

const Disclaimer = () => {
  return (
    <div
      className="
        mx-auto max-w-[900px]
        rounded-2xl
        border border-white/[0.05]
        bg-[#18181b]
        p-10
        leading-[1.8]
        text-zinc-400
      "
    >
      <h2
        className="
          mb-5
          border-b border-white/10
          pb-[15px]
          text-white
        "
      >
        Legal & Site Disclaimer
      </h2>

      <p className="mb-5">
        The data, interfaces, and graphical components represented across the
        ShopNest domain strictly act uniquely as an educational development
        platform. This codebase models rigorous application structures and
        architectures for purely demonstrative, portfolio-oriented engineering
        usage.
      </p>

      <h4 className="mb-2.5 mt-[25px] text-orange-500">
        1. Accuracy of Materials
      </h4>

      <p className="mb-[15px]">
        The materials spanning the ShopNest interface may heavily include
        dynamic technical, typographical, or dummy photographic elements.
        Product matrices mapped in the DB pipeline do absolutely not correlate
        to strictly real physical outputs and are safely populated via generic
        Unsplash imagery protocols.
      </p>

      <h4 className="mb-2.5 mt-[25px] text-orange-500">
        2. Payment Processing Restrictions
      </h4>

      <p className="mb-[15px]">
        No authentic financial variables are handled natively within this
        environment. All payment endpoints forcefully bind exclusively to
        external testing-based networks (Sandbox Razorpay environments). No
        exact deductibles exist.
      </p>

      <h4 className="mb-2.5 mt-[25px] text-orange-500">
        3. External Binding Links
      </h4>

      <p className="mb-[15px]">
        ShopNest operates completely independent domains and takes strictly
        zero absolute parameter responsibility over the specific contents or
        behaviors populated via external routing anchors generated implicitly
        by third-party configurations.
      </p>

      <p className="mt-[30px] text-[0.9rem] italic">
        By interacting natively within this codebase, you unconditionally
        signal acceptance bounded by these parameters efficiently.
      </p>
    </div>
  );
};

export default Disclaimer;