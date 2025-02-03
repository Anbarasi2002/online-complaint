// UserRegister.js
import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const history = useHistory();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', formData);
    //   history.push('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
