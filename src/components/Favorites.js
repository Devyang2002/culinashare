import React from 'react'
import '../styles/Favorites.css'
import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner'
import Cookies from 'js-cookie';
import '../styles/Card.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Favorites() {
  const ButtonStyle = {
    width: '45%',
    height: '60%',
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
  let user_id = "";

  if (userData) {
    const userJson = JSON.parse(userData);
    user_id = userJson._id;
  }

  useEffect(() => {

    const fetchRecipes = async () => {
      if (user_id === "") {
        alert('Please sign in to view favorites');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recipes/favoriteRecipes/${user_id}`); 

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
      <div className="favorites">
        <div className="myfavorite_heading">
        <h2>Your Favorites</h2>
        </div>
        <div className="allFavorites">
          {isLoading ? (
            <div className="loadingcontainer">
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
        (<h3>No Favorites Added!</h3>) : (
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
                  {/* <button style={ButtonStyle} onClick={handleRecipeMarkFav({recipe_id: recipe._id})}>♥ Favorites</button> */}
                  {/* <button style={ButtonStyle}>♥ Favorites</button> */}
                </div>
              </div>
              <div className="photo" style={{ backgroundImage: `url(${recipe.recipe_img})` }} >
              </div>
              <div className="dish_name">{recipe.recipe_name}</div>
            </div>)
          )
          )
          )}
          </div>
      </div>
    )
  }

export default Favorites
