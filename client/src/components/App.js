import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './home-page/Home';
import SpiritPage from './spirits-page/SpiritPage';
import Register from './forms/Register';
import MyBar from './profile/MyBar';
import PostDrink from './forms/PostDrink';
import { fetchAllDrinks } from '../APIService/cocktails-api';
import UpdateDrink from './forms/UpdateDrink'
import {
  useGetVodkaCocktailsQuery,
  useGetGinCocktailsQuery,
} from '../APIService/cocktails-api';


const App = () => {
  const isAuthenticated = useSelector(state => state.userAuth.value);
  const navLinks = ['Cocktails', 'Spirits', 'Search', 'Sign Up'];
  // const spirits = ['vodka', 'gin', 'rum', 'tequila', 'whiskey', 'brandy'];

  const { data: vodka = [] } = useGetVodkaCocktailsQuery();
  const { data: gin = [] } = useGetGinCocktailsQuery();
  const [rum, setRum] = useState([]);
  const [tequila, setTequila] = useState([]);
  const [whiskey, setWhiskey] = useState([]);
  const [brandy, setBrandy] = useState([]);

  useEffect(() => {
    fetchAllDrinks(['tequila', 'mezcal'], setTequila);
    fetchAllDrinks(['whiskey', 'bourbon', 'rye_whiskey', 'scotch'], setWhiskey);
    fetchAllDrinks(['rum', 'white_rum', 'dark_rum'], setRum);
    fetchAllDrinks(['brandy', 'cognac'], setBrandy);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home navLinks={navLinks} />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/profile'
            element={
              isAuthenticated ? <MyBar navLinks={[...navLinks].slice(0, 3)} /> : <Navigate to='/' />
            }
          />
          <Route
            path='/postDrink'
            element={isAuthenticated ? <PostDrink /> : <Navigate to='/' />}
          />

          <Route path='/vodka' element={<SpiritPage vodka={vodka} />} />
          <Route path='/gin' element={<SpiritPage gin={gin} />} />
          <Route path='/rum' element={<SpiritPage rum={rum} />} />
          <Route path='/tequila' element={<SpiritPage tequila={tequila} />} />
          <Route path='/whiskey' element={<SpiritPage whiskey={whiskey} />} />
          <Route path='/brandy' element={<SpiritPage brandy={brandy} />} />
          <Route path='/updateDrink/:drinkName/:ingredients/:instructions' element = {<UpdateDrink />} />
          {/* TRIED TO IMPLEMENT WITH MAP FUNCTION... DID NOT WORK */}
          {/* {spirits.map(spirit => {
            return <Route path={`/${spirit}`} element={<SpiritPage spirit={spirit} />} />;
          })} */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
