import React, { useState } from 'react';
import '../styles/SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
import Cookies from 'js-cookie';

const SignIn = () => {

  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData; 
    
    if (!email || !password) {
      alert('Please fill all the particulars!');
      return;
    }
    try {
      const response = await fetch(`https://culina-share-deha.vercel.app/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        Cookies.set('userData', JSON.stringify(data.data));

        dispatch({type:"USER", payload:true});
        alert('User signed in successfully');
        navigate('/culinashare');
      } else {
        console.error(data.message);
        // Handle sign-in errors
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In to Culina Share</h2>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          required
          onChange={handleInputChange}
        />

        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
        {/* Don't have an account? <a to="/signup">Sign Up</a> */}

      </p>
    </div>
  );
};

export default SignIn;