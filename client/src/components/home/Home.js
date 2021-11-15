import React from 'react';
import { useSelector } from 'react-redux';
import HeroSection from './HeroSection';
import Cocktails from './Cocktails';
import Spirits from './Spirits';
import Search from './Search';
import SignUp from './SignUp';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import { Element } from 'react-scroll';

const Home = ({ popular, latest }) => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const navLinks = ['Cocktails', 'Spirits', 'Search', 'Sign Up'];
  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar navLinks={navLinks} />
      <HeroSection />
      <Element name='Cocktails'>
        <Cocktails popular={popular} latest={latest} />
      </Element>
      <Element name='Spirits'>
        <Spirits />
      </Element>
      <Element name='Search'>
        <Search />
      </Element>
      <Element name='Sign Up'>
        <SignUp />
      </Element>
    </>
  );
};

export default Home;
