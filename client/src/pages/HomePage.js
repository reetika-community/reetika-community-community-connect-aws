import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js'; // Ensure .js extension is present
import { useNavigate, useLocation  } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
    const location = useLocation();
  const [message, setMessage] = useState(location.state?.successMessage || '');

    useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000); // clear after 3s
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
      <div className={styles.container}>
         {message && <div className={styles.successPanel}>{message}</div>}
  <div className={styles.buttonGroup}>
    <button onClick={() => navigate('/login')} className={styles.primary}>
      Login
    </button>
    <button onClick={() => navigate('/register')} className={styles.primary}>
      Register
    </button>
  </div>
  <img src="/logo.jpg" alt="Community Connect Logo" className={styles.logo} />
</div>

    
  );
};

export default HomePage;
