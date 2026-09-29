import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const response = await axios.post('/api/auth/forgot-password', { email });

      alert(response.data.message || 'Verification code sent! Please check your email.');

      // Move to the OTP + new password page, carrying the email along
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Failed to send verification code'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0F0F12] px-5 py-10">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#1A1A1E]">
        {/* Top neon glow accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{
            background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)',
            boxShadow: '0 0 20px 2px #FF6B00',
          }}
        />

        <div className="px-8 pt-10 pb-8">
          {/* Header */}
          <h1 className="text-center text-2xl font-bold text-white">
            Forgot Password?
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your account's email address to receive a verification
            code and reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Email field */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            >
              <input
                type="email"
                placeholder="Account Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            {/* Send code button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: '#FF6B00',
                boxShadow: '0 4px 20px rgba(255,107,0,0.35)',
              }}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>

            {/* Back to login button */}
            <Link
              to="/login"
              className="block w-full rounded-xl border border-gray-600 py-3 text-center text-sm font-semibold text-gray-200 transition-colors hover:bg-white/5"
            >
              Back to Login
            </Link>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Need help? Contact our{' '}
            <a href="#" className="font-semibold" style={{ color: '#FF6B00' }}>
              Support Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
