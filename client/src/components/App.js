import React, { useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './menu/Navbar';
import Sidebar from './menu/Sidebar';
import HeroSection from './home/HeroSection';
import Cocktails from './home/Cocktails';
import Spirits from './home/Spirits';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const toggleSideBar = () => setSideBarOpen(!sideBarOpen);
  return (
    <BrowserRouter>
      {sideBarOpen && <Sidebar toggleSideBar={toggleSideBar} />}
      <Navbar toggleSideBar={toggleSideBar} />
      <HeroSection />
      <Cocktails />
      <Spirits />
    </BrowserRouter>
  );
};

export default App;
