import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <div><Link to="/">Community Connect</Link></div>
      <div>
        {auth ? (
          <>
            <span>{auth.user.name}</span>
            <button onClick={logout} className="ml-4">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
