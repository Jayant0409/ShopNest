import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      alert(
        'Registration Successful! Please check your email for the Welcome OTP.'
      );

      login(response.data);
      navigate('/verify-email', { state: { email } });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || 'Registration failed'
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0F0F12] px-5 py-10">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#1A1A1E]">
        {/* Top neon glow accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl   
          before:absolute
          before:top-0
          before:left-[-50%]
          before:h-1
          before:w-[200%]
          before:bg-[linear-gradient(90deg,transparent,#f97316,transparent)]
          before:content-['']
          before:animate-shimmer"
          
        />

        <div className="px-8 pt-10 pb-8">
          {/* Header */}
          <h1 className="text-center text-2xl font-bold text-white">
            Create account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            Register to get started.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Name field */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            >
              <User size={18} className="shrink-0 text-[#FF6B00]" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Email field */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            >
              <Mail size={18} className="shrink-0 text-[#FF6B00]" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Password field */}
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ backgroundColor: '#141417', borderColor: '#FF6B00' }}
            >
              <Lock size={18} className="shrink-0 text-[#FF6B00]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: '#FF6B00',
                boxShadow: '0 4px 20px rgba(255,107,0,0.35)',
              }}
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold" style={{ color: '#FF6B00' }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
