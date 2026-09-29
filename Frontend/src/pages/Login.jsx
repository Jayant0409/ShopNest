import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      login(response.data);
      navigate('/', { state: { email } });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || 'Login failed'
      );
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-10">
      <form
        onSubmit={handleSubmit}
        className="
          relative flex w-full max-w-[420px]
          flex-col gap-5
          overflow-hidden
          rounded-2xl
          border border-white/[0.05]
          bg-[#18181b]
          p-10
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]

          before:absolute
          before:top-0
          before:left-[-50%]
          before:h-1
          before:w-[200%]
          before:bg-[linear-gradient(90deg,transparent,#f97316,transparent)]
          before:content-['']
          before:animate-shimmer
        "
      >
       <h2 className="mb-1 text-center text-[2rem] font-bold text-white">
  Welcome back
</h2>
<p className="mb-2.5 text-center text-sm text-zinc-400">
  Sign in to continue shopping on ShoppingBaazi.
</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            rounded-lg
            border border-[#27272a]
            bg-[#09090b]
            p-[15px]
            text-[15px] text-white
            outline-none
            transition-all duration-300
            placeholder:text-zinc-500
            focus:border-orange-500
            focus:shadow-[0_0_0_2px_rgba(249,115,22,0.2)]
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            rounded-lg
            border border-[#27272a]
            bg-[#09090b]
            p-[15px]
            text-[15px] text-white
            outline-none
            transition-all duration-300
            placeholder:text-zinc-500
            focus:border-orange-500
            focus:shadow-[0_0_0_2px_rgba(249,115,22,0.2)]
          "
        />

        <div className="-mt-2 text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="
            w-full
            cursor-pointer
            rounded-lg
            bg-orange-500
            px-4
            py-2
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-orange-600
          "
        >
          Login
        </button>

        <p className="mt-[15px] text-center text-zinc-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;