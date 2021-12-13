import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home-page/Home';
import SpiritPage from './spirits-page/SpiritPage';
import Register from './forms/Register';
import MyBar from './profile/MyBar';
import PostDrink from './forms/PostDrink';
import { fetchAllDrinks } from '../APIService/cocktails-api';
import UpdateDrink from './forms/UpdateDrink';
import { useGetSpiritsByTypeQuery } from '../APIService/cocktails-api';

const App = () => {
  const navLinks = ['Cocktails', 'Spirits', 'Search', 'Sign Up'];
  const { data: vodka = [] } = useGetSpiritsByTypeQuery('vodka');
  const { data: gin = [] } = useGetSpiritsByTypeQuery('gin');
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
            element={<MyBar navLinks={[...navLinks].slice(0, 3)} />}
          />
          <Route path='/postDrink' element={<PostDrink />} />
          <Route path='/vodka' element={<SpiritPage vodka={vodka} />} />
          <Route path='/gin' element={<SpiritPage gin={gin} />} />
          <Route path='/rum' element={<SpiritPage rum={rum} />} />
          <Route path='/tequila' element={<SpiritPage tequila={tequila} />} />
          <Route path='/whiskey' element={<SpiritPage whiskey={whiskey} />} />
          <Route path='/brandy' element={<SpiritPage brandy={brandy} />} />
          <Route
            path='/updateDrink/:drinkName/:ingredients/:instructions/:_id'
            element={<UpdateDrink />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
