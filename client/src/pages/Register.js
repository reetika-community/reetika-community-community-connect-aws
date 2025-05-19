import { useState } from 'react';
import axios from '../axios';

const Register = () => {
  const [form, setForm] = useState({ role: 'volunteer', name: '', email: '', password: '', skills: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = form.role === 'admin' ? '/auth/register/admin' : '/auth/register/volunteer';
    const body = { ...form, skills: form.skills.split(',') };
    await axios.post(endpoint, body);
    alert('Registered! Now login.');
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
    </form>
  );
};

export default Register;
