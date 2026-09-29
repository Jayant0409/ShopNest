import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from signup page
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/auth/verify-email", {
        email,
        otp,
      });

      setMessage(response.data.message || "Email verified successfully!");

      // Redirect to home after successful verification
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-2xl border border-white/[0.05] bg-zinc-900 p-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-orange-500 mb-3">
            Verify Your Email
          </h2>

          <p className="text-zinc-400 text-sm">
            Enter the 6-digit OTP sent to your email.
          </p>

          {email && (
            <p className="mt-2 text-zinc-300 text-sm font-medium">
              {email}
            </p>
          )}

        </div>

        {/* Form */}
        <form onSubmit={handleVerify}>

          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Enter OTP
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            className="
              w-full
              rounded-lg
              border border-zinc-700
              bg-zinc-950
              px-4 py-3
              text-center
              text-xl
              tracking-[0.5em]
              text-white
              outline-none
              transition
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-500/20
            "
          />

          {/* Error */}
          {error && (
            <p className="mt-3 text-center text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="mt-3 text-center text-sm text-emerald-400">
              {message}
            </p>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-6
              w-full
              rounded-lg
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              px-5
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-orange-500/20
              transition
              hover:from-orange-600
              hover:to-orange-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>

           

      </div>

    </div>
  );
};

export default EmailVerification;