// In Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({ role: 'volunteer', name: '', email: '', password: '', skills: '' });
  const [message, setMessage] = useState(''); // New state for messages
  const [isError, setIsError] = useState(false); // New state to indicate error
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsError(false);

    try {
      const endpoint = form.role === 'admin' ? '/auth/register/admin' : '/auth/register/volunteer';
      const body = { ...form, skills: form.skills.split(',') };
      await axios.post(endpoint, body);
      navigate('/', { state: { successMessage: 'Registration successful! Now please login.' } });
      setMessage('Registered successfully! Now please login.'); // Success message
      // Optionally, redirect to login page:
      // navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.'); // Error message from backend or generic
      setIsError(true);
    }
   
  };
    const goBack = ()=>{
      navigate('/')
    }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
  <select
    className={styles.input}
    value={form.role}
    onChange={(e) => setForm({ ...form, role: e.target.value })}
  >
    <option value="volunteer">Volunteer</option>
    <option value="admin">Admin</option>
  </select>

  <input
    className={styles.input}
    placeholder="Name"
    onChange={(e) => setForm({ ...form, name: e.target.value })}
  />
  <input
    className={styles.input}
    placeholder="Email"
    onChange={(e) => setForm({ ...form, email: e.target.value })}
  />
  <input
    type="password"
    className={styles.input}
    placeholder="Password"
    onChange={(e) => setForm({ ...form, password: e.target.value })}
  />
  {form.role === 'volunteer' && (
    <input
      className={styles.input}
      placeholder="Skills (comma-separated)"
      onChange={(e) => setForm({ ...form, skills: e.target.value })}
    />
  )}
<div>
  <button type="submit" className={styles.button}>
    Register
  </button>
   <button  onClick={() => goBack()} className={styles.button}>
    Back
  </button>
</div>
  {message && (
    <p className={`${styles.message} ${isError ? styles.error : styles.success}`}>
      {message}
    </p>
  )}
</form>

  );
};

export default Register;