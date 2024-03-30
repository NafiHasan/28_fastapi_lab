import React, { useState } from 'react';
import './RegistrationForm.css';
import axios from 'axios'

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset errors before validation
    setErrors({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phoneNumber: ''
    });

    // Check constraints
    if (formData.username.length <= 5) {
      setErrors(prevErrors => ({
        ...prevErrors,
        username: 'Username must have more than five characters.'
      }));
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Invalid email address.'
      }));
      return;
    }

    if (formData.phoneNumber.length !== 11 || !isValidPhoneNumber(formData.phoneNumber)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        phoneNumber: 'Phone number must have exactly 11 digits.'
      }));
      return;
    }

    if (formData.password.length <= 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must have more than six characters.'
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.'
      }));
      return;
    }

    try {
      // console.log(formData);
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data); 
  
      // Clear form fields after successful submission
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: ''
      });
    } catch (error) {
      console.error(error);
        console.log("error here")
    }

    // Clear form fields after submission
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phoneNumber: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate phone number format
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
