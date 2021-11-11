import React, { useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import HeroSection from './HeroSection';

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
