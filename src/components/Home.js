import '../styles/Home.css'
import React from 'react'
import '../styles/Recipes.css'
import SearchIcon from '@mui/icons-material/Search';
import ControlledCarousel from './ControlledCarousel.js';
import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner'
import Cookies from 'js-cookie';
import '../styles/Card.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Home() {
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
  let user_id = "";

  if (userData) {
    const userJson = JSON.parse(userData);
    user_id = userJson._id;
  }

  const [selectedCategory, setSelectedCategory] = useState("0");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);

    // Filter recipes based on the search text
    const filtered = recipes.filter(recipe => 
      recipe.recipe_name.toLowerCase().includes(text.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);

    // Perform any additional actions based on the selected category
    // For example, you can filter recipes here
    if (categoryValue === "0") {
      // If "All" is selected, show all recipes
      setFilteredRecipes(recipes);
    } else {
      // Filter recipes based on the selected category
      const filtered = recipes.filter(recipe => recipe.category === categoryValue);
      setFilteredRecipes(filtered);
    }
  }
  const handleRecipeMarkFav = async({e, recipe_id}) => {
    e.preventDefault();

    if (user_id === "") {
      alert('Please sign in to mark favorite');
      return;
    }

    try {
      const response = await fetch(`https://culinashare-production.up.railway.app/api/v1/recipes/${recipe_id}/markFavorite/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });
      
      const data = await response.json();
      console.log(data);

      if (data.success) {

        alert('Recipe added to favorites successfully!');

      } else {
        console.error(data.message);
        
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://culinashare-production.up.railway.app/api/v1/recipes/fetchAll`); 

        const data = await response.json();
        const recipeData = data.data;

        const allRecipes = recipeData.filter((recipe) => recipe !== null);

        setRecipes(allRecipes);
        setFilteredRecipes(allRecipes);

        // console.log(recipeData);
        console.log(recipes);

      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  
  }, []);

  return (
    <div className="AllRecipes">
        <div className="class1">
          <div className="class11">
          <ControlledCarousel/>
          </div>
          <div className="class12">
          <h1>Cook, Share, Connect: Culina Share's Kitchen Hub</h1>
          </div>
          </div>
      <div className="heading">
        <h1>Recipes</h1>
      </div>
      {/* <div className="tabs">
        <button>All</button>
        <button>Vegetarian</button>
        <button>Non-Vegetarian</button>
        <button>Dessert</button>
        <button>Quick-Meal</button>
       </div> */}
       
      <div className="searchbar">
            <SearchIcon id="search_icon" />
            <input placeholder='Search Here' id='inputt' value={searchText} 
          onChange={handleSearchChange} />
      </div>
      <div className="category_tab">
      <select className="form-select form_selector" aria-label="Default select example" onClick={handleCategoryChange}>
       {/* <option>Open to select the category</option> */}
       <option selected value="0">All</option>
       <option value="1">Vegetarian</option>
       <option value="2">Non-Vegetarian</option>
       <option value="3">Dessert</option>
       <option value="4">Quick-Meal</option>
       </select>
       </div>
      <div className="recipes">
        {isLoading ? (
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
        filteredRecipes.length === 0 ? 
        (<h3>No Recipes Found!</h3>) : (
          filteredRecipes.map((recipe) => (
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
                <Link to= '/explore' state={{ recipe }}>
                    <button style={ButtonStyle}>Explore</button>
                  </Link>
                  <button style={ButtonStyle} onClick={(e) => handleRecipeMarkFav({ e, recipe_id: recipe._id })}>♥ Favorites</button>
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

export default Home
