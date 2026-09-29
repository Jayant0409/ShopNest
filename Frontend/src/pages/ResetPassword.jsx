import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Email passed from ForgotPassword page
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Missing email. Please restart the forgot password process.');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      // Step 1: verify the OTP, get a short-lived reset token back
      const verifyRes = await axios.post('/api/auth/verify-reset-otp', {
        email,
        otp,
      });

      const { resetToken } = verifyRes.data;

      // Step 2: use that token to actually set the new password
      const resetRes = await axios.post('/api/auth/reset-password', {
        email,
        resetToken,
        newPassword,
      });

      setMessage(resetRes.data.message || 'Password reset successful!');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
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
            Reset Password
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter the 6-digit code sent to your email and choose a new
            password.
          </p>
          {email && (
            <p className="mt-2 text-center text-sm font-medium text-gray-300">
              {email}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* OTP field */}
            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-xl border px-4 py-3 text-center text-lg tracking-[0.4em] text-gray-200 outline-none placeholder:tracking-normal placeholder:text-gray-500"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            />

            {/* New password field */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            >
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Confirm password field */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            >
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            {/* Success */}
            {message && (
              <p className="text-center text-sm text-emerald-400">{message}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: '#FF6B00',
                boxShadow: '0 4px 20px rgba(255,107,0,0.35)',
              }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
