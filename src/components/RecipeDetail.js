import React, { useState, useEffect } from 'react';
import '../styles/RecipeDetail.css';
import { Audio } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';

function RecipeDetail() {
  const location = useLocation();

  const ButtonStyle = {
    width: '45%',
    height: '25%',
    marginTop: '7%',
    backgroundColor: '#ffae42',
    border: 'none',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    color: '#9b5a06',
    borderRadius: '20px',
    boxShadow: '0px 0px 10px 0px #9b5a06',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {

        const recipe = location.state;
        console.log(location.state);

        console.log(recipe);

        console.log(`recipe 0 ${recipe._id}`)

        const recipe_id = location.state.recipe._id;

        if (!recipe_id) {
          console.error('Recipe ID is undefined');
          return;
        }

        const response = await fetch(`https://culina-share-deha.vercel.app/api/v1/recipes/fetchRecipe/${recipe_id}`);

        const data = await response.json();
        const recipeData = data.data;

        // const filteredRecipe = recipeData.filter((recipe) => recipe !== null);

        setRecipe(recipeData);

        console.log(`recipe 2 ${recipe._id}`);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  return (
    isLoading ? (
      <Audio
      height="80"
      width="80"
      radius="9"
      color="#9b5a06"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
    ) : (
    <div className="recipe_detail">
      <div className="recipe_basics">
        <img src={recipe.recipe_img} alt="" />
        <div className="heading_button">
          <h4>{recipe.recipe_name}</h4>
          <button style={ButtonStyle}>♥ Favorites</button>
        </div>
        <div className="cooking_time">Cooking time: {recipe.cooking_time}</div>
        <div className="rating">
          <p>⭐</p>
          <p>⭐</p>
          <p>⭐</p>
          <p>⭐</p>
        </div>
      </div>
      <div className="recipe_main">
        <h6>Ingredients </h6>
        <p>{recipe.ingredients}</p>
        <h6>Instructions to make it!</h6>
        <p>{recipe.instructions}</p>
      </div>
    </div>)
  
  );
}

export default RecipeDetail;
