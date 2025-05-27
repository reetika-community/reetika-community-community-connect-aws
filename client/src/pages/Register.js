// In Register.js
import React, { useState } from 'react';
import axios from '../axios';

const Register = () => {
  const [form, setForm] = useState({ role: 'volunteer', name: '', email: '', password: '', skills: '' });
  const [message, setMessage] = useState(''); // New state for messages
  const [isError, setIsError] = useState(false); // New state to indicate error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsError(false);

    try {
      const endpoint = form.role === 'admin' ? '/auth/register/admin' : '/auth/register/volunteer';
      const body = { ...form, skills: form.skills.split(',') };
      await axios.post(endpoint, body);
      setMessage('Registered successfully! Now please login.'); // Success message
      // Optionally, redirect to login page:
      // navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.'); // Error message from backend or generic
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="volunteer">Volunteer</option>
        <option value="admin">Admin</option>
      </select>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {form.role === 'volunteer' && <input placeholder="Skills (comma-separated)" onChange={(e) => setForm({ ...form, skills: e.target.value })} />}
      <button type="submit">Register</button>
      {message && ( // Display message if present
        <p className={`mt-2 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default Register;