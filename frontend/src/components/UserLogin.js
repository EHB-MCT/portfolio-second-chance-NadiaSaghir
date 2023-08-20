import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navigation';

function UserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:80/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        setMessage('User logged in successfully.');
        history.push('/add-recipe');
      } else if (response.status === 401) {
        setMessage('Incorrect password.');
      } else {
        setMessage('Login failed.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Login</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        {}
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;