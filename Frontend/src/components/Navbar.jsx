import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-[1000] flex items-center justify-between border-b border-white/5 bg-[rgba(9,9,11,0.8)] px-12 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md max-md:flex-col max-md:gap-4 max-md:px-5 max-md:py-4">

      {/* Brand */}
      <div>
        <Link
          to="/"
          className="relative flex items-center gap-2.5 text-3xl font-bold tracking-tight text-white  after:ml-[-5px] after:text-4xl after:font-bold after:text-orange-500 after:content-['.']"
        >
          <img
            src="/ShoppingBaazi.png"
            alt="ShopNest"
            className="h-9 w-9 rounded-lg object-cover"
          />
          ShopNest
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-7 max-md:flex-wrap max-md:justify-center">

        <li>
          <Link
            to="/shop"
            className="relative text-[15px] font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Shop
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className="relative text-[15px] font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Cart ({cartItems.length})
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link
                to="/profile"
                className="relative text-[15px] font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Hi, {user.name}
              </Link>
            </li>

            {user.role === 'admin' && (
              <li>
                <Link
                  to="/admin"
                  className="relative text-[15px] font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-md border border-red-500/30 bg-transparent px-4 py-2 font-semibold text-red-500 transition-all duration-300 hover:-translate-y-px hover:border-red-500 hover:bg-red-500/10"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="relative text-[15px] font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Login
            </Link>
          </li>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;