import React from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import HeroSection from './sections/HeroSection';
import Cocktails from './sections/Cocktails';
import Spirits from './sections/Spirits';
import Search from './sections/Search';
import { Element } from 'react-scroll';
import { useSelector } from 'react-redux';

const Home = () => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const navLinks = ['Cocktails', 'Spirits', 'Search'];

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks}/>}
      <Navbar navLinks={navLinks} />
      <HeroSection />
      <Element name='Cocktails' id='Cocktails'>
        <Cocktails />
      </Element>
      <Element name='Spirits' id='Spirits'>
        <Spirits />
      </Element>
      <Element name='Search' id='Search'>
        <Search />
      </Element>
    </>
  );
};

export default Home;
