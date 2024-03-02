import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';
import { createContext, useReducer } from 'react';
import Favorites from './components/Favorites';
import AboutUs from './components/AboutUs';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RecipeDetail from './components/RecipeDetail';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {initialState, reducer} from '../src/reducer/UseReducer';
import Contribute from './components/Contribute';
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Routes>
      <Route exact path='/culinashare' element={<Home/>} />
      <Route exact path='/myrecipes' element={<Recipes/>} />
      <Route exact path='/favorites' element={<Favorites/>} />
      <Route exact path='/aboutus' element={<AboutUs/>} />
      <Route exact path='/signin' element={<SignIn/>} />
      <Route exact path='/signup' element={<SignUp/>} />
      <Route exact path='/explore' element={<RecipeDetail/>} />
      <Route exact path='/addrecipe' element={<Contribute/>} />


  </Routes>
  )
}
function App() {

  const[state, dispatch] =  useReducer(reducer, initialState)
  return (
    <>
    {/* <div className="main"> */}
    <UserContext.Provider value={{state, dispatch}} >
      
  <BrowserRouter>
    <Navbar/>
    {/* <Recipess/> */}
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    {/* </div> */}
    </>
  );
}

export default App;
