import React from 'react'
import '../styles/Card.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Card() {
  const ButtonStyle = {
    width: '100%',
    // height: '15%',
    marginTop: '5vh',
    marginLeft: '140px',
    backgroundColor: '#ffae42',
    border: 'none',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    color: '#9b5a06',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px 0px #9b5a06',
  }
  return (
    <>
    <div className="card">
      <div className="info">
        <div className="name">
          {/* <img src={img} alt="" />
           */}
           <AccountCircleIcon id="account"/>
          <p>devyangsaini2002d@gmail.com</p>
        </div>
        <div className="divider"></div>
        <div className="ingredients">
          <p>Ingredients: </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="button1">
        <Link to='/explore'><button 
        style = {ButtonStyle}
        >Explore</button></Link>
         <button 
        style = {ButtonStyle}
        >♥ Favorites</button>
        </div>
        
      </div>
      <div className="photo"></div>
      <div className="dish_name">White Pasta</div>
    </div>
      </>
  )
}

export default Card


