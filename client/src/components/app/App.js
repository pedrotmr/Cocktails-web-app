import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import HeroSection from '../hero-section/HeroSection';

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
