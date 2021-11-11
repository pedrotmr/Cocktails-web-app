import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/menu/Navbar';
import Sidebar from './components/menu/Sidebar';
import HeroSection from './components/hero-section/HeroSection';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const toggleSideBar = () => setSideBarOpen(!sideBarOpen);
  return (
    <BrowserRouter>
      {sideBarOpen && <Sidebar toggleSideBar={toggleSideBar} />}
      <Navbar toggleSideBar={toggleSideBar} />
      <HeroSection />
    </BrowserRouter>
  );
};

export default App;
