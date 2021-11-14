import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import axios from 'axios';
import Navbar from './menu/Navbar';
import Sidebar from './menu/Sidebar';
import Home from './home/Home';
import SpiritList from './spirits/SpiritList';
import SignIn from './forms/SignIn';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navLinks = ['Cocktails', 'Spirits', 'Search', 'Sign Up'];
  // const navSpirits = ['Vodka', 'Gin', 'Rum', 'Whiskey', 'Tequila', 'Breandy'];
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [vodka, setVodka] = useState([]);
  const [gin, setGin] = useState([]);
  const [rum, setRum] = useState([]);
  const [tequila, setTequila] = useState([]);
  const [whiskey, setWhiskey] = useState([]);
  const [brandy, setBrandy] = useState([]);

  useEffect(() => {
    fetchDrinks('popular.php', setPopular);
    fetchDrinks('latest.php', setLatest);
    fetchDrinks('filter.php?i=vodka', setVodka);
    fetchDrinks('filter.php?i=gin', setGin);
    fetchAllDrinks(['tequila', 'mezcal'], setTequila);
    fetchAllDrinks(['whiskey', 'bourbon', 'rye_whiskey', 'scotch'], setWhiskey);
    fetchAllDrinks(['rum', 'white_rum', 'dark_rum'], setRum);
    fetchAllDrinks(['brandy', 'cognac'], setBrandy);
  }, []);

  const toggleSideBar = () => setSideBarOpen(!sideBarOpen);

  const fetchDrinks = (input, setState) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v2/9973533/${input}`)
      .then(res => setState(res.data.drinks))
      .catch(err => console.log(err));
  };

  const fetchAllDrinks = ([...args], setState) => {
    args.forEach(arg => {
      axios
        .get(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${arg}`)
        .then(res => setState(prev => [...prev, ...res.data.drinks]))
        .catch(err => console.log(err));
    });
  };

  return (
    <>
      <BrowserRouter>
        {sideBarOpen && <Sidebar toggleSideBar={toggleSideBar} navLinks={navLinks} />}
        <Navbar toggleSideBar={toggleSideBar} navLinks={navLinks} />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                popular={popular}
                latest={latest}
                toggleSideBar={toggleSideBar}
                sideBarOpen={sideBarOpen}
                navLinks={navLinks}
              />
            }
          />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/mybar' element={<SignIn />} />
          <Route path='/vodka' element={<SpiritList vodka={vodka} title={'Vodka'} />} />
          <Route path='/gin' element={<SpiritList gin={gin} title={'Gin'} />} />
          <Route path='/rum' element={<SpiritList rum={rum} title={'Rum'} />} />
          <Route
            path='/tequila'
            element={<SpiritList tequila={tequila} title={'Tequila'} />}
          />
          <Route
            path='/whiskey'
            element={<SpiritList whiskey={whiskey} title={'Whiskey'} />}
          />
          <Route
            path='/brandy'
            element={<SpiritList brandy={brandy} title={'Brandy'} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
