import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/App.css';
import axios from 'axios';
import Navbar from './menu/Navbar';
import Sidebar from './menu/Sidebar';
import Home from './home/Home';
import SignIn from './forms/SignIn';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [vodka, setVodka] = useState([]);
  const [gin, setGin] = useState([]);
  // const [rum, setRum] = useState([]);
  // const [tequila, setLatest] = useState([]);
  // const [whiskey, setLatest] = useState([]);

  useEffect(() => {
    fetchDrinks('popular.php', setPopular);
    fetchDrinks('latest.php', setLatest);
    fetchDrinks('filter.php?i=vodka', setVodka);
    fetchDrinks('filter.php?i=gin', setGin);
  }, []);

  const toggleSideBar = () => setSideBarOpen(!sideBarOpen);

  const fetchDrinks = (input, setState) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v2/9973533/${input}`)
      .then(res => setState(res.data.drinks))
      .catch(err => console.log(err));
  };

  return (
    <>
      <BrowserRouter>
        {sideBarOpen && <Sidebar toggleSideBar={toggleSideBar} />}
        <Navbar toggleSideBar={toggleSideBar} />
        <Routes>
          <Route path='/' element={<Home popular={popular} latest={latest} />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/mybar' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
