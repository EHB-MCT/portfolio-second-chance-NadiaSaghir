import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navigation';

/**
 * Functional component representing a user registration form.
 *
 * @returns {JSX.Element} The JSX element representing the registration form.
 */
function UserRegistration() {
  // State to store user registration data and display messages
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('http://localhost:80/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage('User registered successfully. Please log in.');
        history.push('/login'); // Redirect to the login page after successful registration
      } else if (response.status === 500) {
        setMessage('An error occurred while registering the user.');
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  // Render the registration form
  return (
    <div>
      <Navbar />
      <h2>Register</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegistration;