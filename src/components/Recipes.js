import '../styles/Recipes.css'
import React from 'react'
import img from '../images/dt-bg.png';
import noodles from '../images/noodles.jpg';
import pasta from '../images/pasta.jpg';
import pizza from '../images/pizza.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
import MyRecipes from './MyRecipes';
import Cookies from 'js-cookie';


function Recipes() {
  // const {state, dispatch} = useContext(UserContext);
  const userData = Cookies.get('userData');
  let user_id = "";

  if (userData) {
    const userJson = JSON.parse(userData);
    user_id = userJson._id;
  }

  const ShowRecipes =()=>{
    if(user_id){
      return (
        <>
        <MyRecipes/>
        </>
      )
    }
    else{
      return(
        <>
        <div className="content">
      <div className="recipes_home">
        <div className="img1">
            <img src={noodles} alt="" />
        </div>
        <div className="img2">
          <img src={pasta} alt="" />
        </div>
        <div className="img3">
          <img src={pizza} alt="" />
        </div>
      </div>
      <div className="content1">
      <h1>Unleash Your Culinary Creations: Share Your Recipes, Showcase Your Cooking Skills!</h1>
      <p>Step into the delightful world of culinary creativity, where flavors dance and aromas weave tales of delicious journeys. Join me on a gastronomic adventure as I showcase my cooking skills and share a treasure trove of recipes. From sizzling stir-fries to decadent desserts, each dish is a canvas painted with passion and precision.</p>
      </div>
      <Link to='/signup'><button>Sign Up</button></Link>
    </div>
    <div className="splash_img">
      <img src={img} alt="" />
    </div>
        </>
      )
    }
  }
  return (
    <div className="main">
    <ShowRecipes/>
  </div>
  )
}

export default Recipes
