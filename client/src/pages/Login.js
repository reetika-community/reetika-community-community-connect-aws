import React, {useEffect} from 'react';
import { useState, useContext } from 'react';
import axios from '../axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // clear previous error
    try {
    const res = await axios.post('/auth/login', form);
    login(res.data.user, res.data.token);
    navigate('/projects');
  }
  catch (err) {
      // Show error message from response if available, or fallback
      const message =
        err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    }

   
  };
   const goBack = ()=>{
      navigate('/')
    }


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
  <input
    className={styles.input}
    placeholder="Email"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
  />
  <input
    type="password"
    className={styles.input}
    placeholder="Password"
    value={form.password}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
  />
  <div>
  <button type="submit" className={styles.button}>
    Login
  </button>
  <button  onClick={() => goBack()} className={styles.button}>
    Back
  </button>
  </div>
  {error && <div className={styles.error}>{error}</div>}
</form>

  );
};

export default Login;