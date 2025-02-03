// UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
//   const history = useHistory();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', formData);
      localStorage.setItem('token', res.data.token);
    //   history.push('/complaint');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
