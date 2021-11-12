import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './menu/Navbar';
import Sidebar from './menu/Sidebar';
import HeroSection from './home/HeroSection';
import Cocktails from './home/Cocktails';
import Spirits from './home/Spirits';
import axios from 'axios';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPopular();
    getLatest();
  }, []);

  const toggleSideBar = () => setSideBarOpen(!sideBarOpen);

  const getPopular = async () => {
    setLoading(true);
    const res = await axios.get(
      'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php'
    );
    setLoading(false);
    setPopular(res.data.drinks);
  };

  const getLatest = async () => {
    setLoading(true);
    const res = await axios.get(
      'https://www.thecocktaildb.com/api/json/v2/9973533/latest.php'
    );
    setLoading(false);
    setLatest(res.data.drinks);
  };

  return (
    <BrowserRouter>
      {sideBarOpen && <Sidebar toggleSideBar={toggleSideBar} />}
      <Navbar toggleSideBar={toggleSideBar} />
      <HeroSection />
      {!loading && <Cocktails popular={popular} latest={latest} />}
      <Spirits />
    </BrowserRouter>
  );
};

export default App;
