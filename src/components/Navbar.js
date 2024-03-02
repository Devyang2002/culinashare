// import React from 'react'
// import '../styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { UserContext } from '../App';
import Cookies from 'js-cookie';

function Navbar() {
  const {state, dispatch} = useContext(UserContext);

  const logoutfn = () => {
    setTimeout(() => {
      Cookies.remove('userData');
      dispatch({ type: "USER", payload: false });
    }, 1000); 
  };

  const userData = Cookies.get('userData');
  let user_id = "";

  if (userData) {
    const userJson = JSON.parse(userData);
    user_id = userJson._id;
  }
  
  const RenderMenu =() =>{
    if(user_id){
      return(
       <ul className={mobileMenuOpen ? 'active' : ''}>
            <Link to="/culinashare"className={location.pathname === '/home' ? 'active' : ''}><li onClick={closeMobileMenu}>Home</li></Link>
            <Link to="/myrecipes"className={location.pathname === '/myrecipes' ? 'active' : ''}><li onClick={closeMobileMenu}>My Recipes</li></Link>
            <Link to="/addrecipe"className={location.pathname === '/addrecipe' ? 'active' : ''}><li onClick={closeMobileMenu}>Contribute</li></Link>
            <Link to="/favorites"className={location.pathname === '/favorites' ? 'active' : ''}><li onClick={closeMobileMenu}>Favorites</li></Link>
            <Link to="/aboutus"className={location.pathname === '/aboutus' ? 'active' : ''}><li onClick={closeMobileMenu}>About Us</li></Link>
            <Link to="/culinashare"className={location.pathname === '/home' ? 'active' : ''}><button id="logout_button" style={{textDecoration:'none',}} onClick={logoutfn}>Logout</button></Link>
            {/* <a href="/"><li>Home</li></a>
            <a href="/myrecipes"><li>My Recipes</li></a>
            <a href="/favorites"><li>Favorites</li></a>
            <a href="/aboutus"><li>About Us</li></a>
            <a href="/signin"><li>Sign In</li></a> */}
        </ul>
      )
    }
    else{
      return(
      <ul className={mobileMenuOpen ? 'active' : ''}>
      <Link to="/culinashare"className={location.pathname === '/home' ? 'active' : ''}><li onClick={closeMobileMenu}>Home</li></Link>
      <Link to="/myrecipes"className={location.pathname === '/myrecipes' ? 'active' : ''}><li onClick={closeMobileMenu}>My Recipes</li></Link>
      {/* <Link to="/favorites"className={location.pathname === '/favorites' ? 'active' : ''}><li onClick={closeMobileMenu}>Favorites</li></Link> */}
      <Link to="/aboutus"className={location.pathname === '/aboutus' ? 'active' : ''}><li onClick={closeMobileMenu}>About Us</li></Link>
      <Link to="/signin"className={location.pathname === '/signin' ? 'active' : ''}><li onClick={closeMobileMenu}>Sign In</li></Link>
      {/* <a href="/"><li>Home</li></a>
      <a href="/myrecipes"><li>My Recipes</li></a>
      <a href="/favorites"><li>Favorites</li></a>
      <a href="/aboutus"><li>About Us</li></a>
      <a href="/signin"><li>Sign In</li></a> */}
  </ul>
      )
    }

  }
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    
  };
  return (
    <>
    <header className={mobileMenuOpen ? 'active' : ''}>
    <div className="nav">
      <div className="web_name">
        <h1>Culina Share</h1></div>
        <div className={`web_nav ${mobileMenuOpen ? 'active' : ''}`}>
           <RenderMenu/>
        </div>
    <div className="mobile_btn" onClick={toggleMobileMenu}>
    {mobileMenuOpen ? <CloseIcon id='mobile_close' name="close-outline" />  : <MenuIcon id='mobile_icon' name="menu-outline" /> }
    </div>
    </div>
    </header>
    </>
  )
}

export default Navbar
