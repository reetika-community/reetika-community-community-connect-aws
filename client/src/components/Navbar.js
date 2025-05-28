import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js'; // Ensure .js extension is present
import { useNavigate } from 'react-router-dom';
import styles from './components.module.css';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="p-4 bg-blue-600 text-white flex items-center shadow-md"> {/* Removed justify-between to align all content to the left */}
      {/* This single div now holds both the logo and the auth links, all aligned to the left */}
      <div className="flex items-center space-x-4"> {/* Added space-x-4 for spacing between elements */}
        {/* Logo Section */}
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
            <button
      onClick={() => navigate('/login')}
      className={styles.primary}
    >
      Login
    </button>
            <button
      onClick={() => navigate('/register')}
      className={styles.primary}
    >
      Register
    </button>
          </>
        )}
        <Link to="/">
          <img src="/logo.jpg" alt="Community Connect Logo" className="h-10 w-auto rounded-md" />
        </Link>

        {/* Login/Register or User Info/Logout Section */}
        
      </div>
    </nav>
  );
};

export default Navbar;
