import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js'; // Ensure .js extension is present

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-blue-600 text-white flex items-center shadow-md"> {/* Removed justify-between to align all content to the left */}
      {/* This single div now holds both the logo and the auth links, all aligned to the left */}
      <div className="flex items-center space-x-4"> {/* Added space-x-4 for spacing between elements */}
        {/* Logo Section */}
        <Link to="/">
          {/*
            Replace src with the actual path to your logo.
            Assuming image_a22047.jpg is in your public folder and renamed to logo.jpg.
            If you keep the original filename, use src="/image_a22047.jpg".
            If you place it in src/assets, you'd need to import it:
            import logo from '../assets/logo.jpg';
            and then use src={logo}
          */}
          <img src="/logo.jpg" alt="Community Connect Logo" className="h-10 w-auto rounded-md" />
          {/*
            Uncomment the span below if you want text next to the logo.
            You'll need to define 'font-brand' in your tailwind.config.js if you use it.
          */}
          {/* <span className="ml-3 text-xl font-bold font-brand">Community Connect</span> */}
        </Link>

        {/* Login/Register or User Info/Logout Section */}
        {auth ? (
          <>
            <span className="text-lg font-medium">Welcome, {auth.user.name}!</span>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
