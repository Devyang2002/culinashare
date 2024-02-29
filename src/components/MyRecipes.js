import React from 'react'
import '../styles/Recipess.css'
import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner'
import Cookies from 'js-cookie';
import '../styles/Card.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function MyRecipes() {

  const ButtonStyle = {
    width: '45%',
    height: '25%',
    marginTop: '7%',
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

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userData = Cookies.get('userData');
  const userJson = JSON.parse(userData);

  const user_id = userJson._id;

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recipes/fetchUserRecipes/${user_id}`); 

        const data = await response.json();
        const recipeData = data.data;

        const filteredRecipes = recipeData.filter((recipe) => recipe !== null);

        setRecipes(filteredRecipes);

      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  
  }, []);

  return (
    <div className="your_recipes">
      <div className="myrecipe_heading">
      <h2>Your Recipes</h2>
      </div>
      <div className="myrecipesall">
        {isLoading ? (
          <div className="loading-container">
        <Audio
        height="80"
        width="80"
        radius="9"
        color="#9b5a06"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      </div>
      ) : (
        recipes.length === 0 ? 
        (<h3>No Recipes Added!</h3>) : (
          recipes.map((recipe) => (
            <div key={recipe._id} className="card">
              <div className="info">
                <div className="name">
                  <AccountCircleIcon id="account" />
                  <p>{recipe.user_name}</p>
                </div>
                <div className="divider"></div>
                <div className="ingredients">
                  <p>Ingredients: </p>
                  {/* <p>{recipe.ingredients}</p> */}
                  <p>{recipe.ingredients.length > 150 ? `${recipe.ingredients.substring(0, 150)}...` : recipe.ingredients}</p>
                </div>
                <div className="button1">
                  <Link to='/explore' state={{ recipe }}>
                    <button style={ButtonStyle}>Explore</button>
                  </Link>
                  <button style={ButtonStyle}>♥ Favorites</button>
                </div>
              </div>
              <div className="photo" style={{ backgroundImage: `url(${recipe.recipe_img})` }} >
              </div>
              <div className="dish_name">{recipe.recipe_name}</div>
            </div>)
          )
        ))}
        </div>
    </div>
  )
}

export default MyRecipes

