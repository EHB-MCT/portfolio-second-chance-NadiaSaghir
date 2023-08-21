import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navigation';

/**
 * Functional component representing a user login form.
 *
 * @returns {JSX.Element} The JSX element representing the login form.
 */
function UserLogin() {
  // State to store user login data and display messages
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  /**
   * Event handler for input field changes.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Event handler for form submission.
   *
   * @param {Event} e - The form submit event.
   */
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
        history.push('/add-recipe'); // Redirect to the add recipe page after successful login
      } else if (response.status === 401) {
        setMessage('Incorrect password.');
      } else {
        setMessage('Login failed.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  // Render the login form
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