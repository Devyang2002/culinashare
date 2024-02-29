import React from 'react'
import '../styles/Contribute.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

function Contribute() {

  const userData = Cookies.get('userData');
  const userJson = JSON.parse(userData);

  const user_id = userJson._id;
  const user_name = userJson.name;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipe_name: '',
    recipe_img: '',
    cooking_time: '',
    ingredients:'',
    instructions:'',
    user_name: user_name,
    user_id: user_id,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecipeAdd = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recipes/create`, {
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
          recipe_name: '',
          recipe_img: '',
          cooking_time: '',
          ingredients:'',
          instructions:'',
          user_name:'',
          user_id:'',
        });
        console.log('Recipe Created Successfully and added to My Recipes');

        alert('Recipe Created Successfully and added to My Recipes');

        navigate('/myrecipes');
        
        // Handle the next steps, such as redirecting to login page
      } else {
        console.error(data.message);
        
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="contribute_form">
      <form id="recipeForm" onSubmit={handleRecipeAdd}>
    <label for="recipe_name">Recipe Name:</label>
    <input type="text" id="recipe_name" name="recipe_name" 
          placeholder="Recipe Name"
          required
          value={formData.recipe_name}
          onChange={handleInputChange}/>

    <label for="recipe_img">Recipe Image URL:</label>
    <input type="text" id="recipe_img" name="recipe_img"
    placeholder="Recipe Image Url"
    required
    value={formData.recipe_img}
    onChange={handleInputChange}
    />

    <label for="cooking_time">Cooking Time (minutes):</label>
    <input type="number" id="cooking_time" name="cooking_time" 
    placeholder="Cooking Time"
    required
    value={formData.cooking_time}
    onChange={handleInputChange}
    />
    
    <label for="category">Category:</label>
    <select className="form-select form_selector" aria-label="Default select example"
    id="category" name="category" 
    placeholder="category"
    required
    value={formData.category}
    onChange={handleInputChange}
    >
       <option selected>Open to select the category</option>
       <option value="1">Vegetarian</option>
       <option value="2">Non-Vegetarian</option>
       <option value="3">Dessert</option>
       <option value="4">Quick-Meal</option>
       </select>

    <label for="ingredients">Ingredients:</label>
    <textarea id="ingredients" name="ingredients" 
    placeholder="ingredients"
    required
    value={formData.ingredients}
    onChange={handleInputChange}
     rows="4" ></textarea>

    <label for="instructions">Instructions:</label>
    <textarea id="instructions" name="instructions"  placeholder="instructions"
    required
    value={formData.instructions}
    onChange={handleInputChange} rows="6" ></textarea>

    <button type="submit">Submit</button>
</form>
    </div>
  )
}

export default Contribute
