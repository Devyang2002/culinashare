import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import '../styles/SignUp.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

const SignUp = () => {
  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    console.log('Before fetch');
    try {
      const response = await fetch(`https://culinashare-production.up.railway.app/api/v1/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
    
      // if (!response.ok) {
      //   throw new Error(`Failed to fetch: ${response.statusText}`);
      // }
    
      
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setFormData({
          name: '',
          email: '',
          password: '',
        });
        dispatch({type:"USER", payload:false});
        console.log('User registered successfully');

        alert('User registered successfully');

        navigate('/signin');
        
        // Handle the next steps, such as redirecting to login page
      } else {
        console.error(data.message);
        // Handle errors
        if (data.message.includes("already exists")) {
          alert('Email already exists. Please use a different email.');
        } else {
          alert('Email already exists. Please use a different email.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up for Culina Share</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
        {/* Already have an account? <a to="/signin">Sign In</a> */}

      </p>
    </div>
  );
};

export default SignUp;