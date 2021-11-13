import React from 'react';
import HeroSection from './HeroSection';
import Cocktails from './Cocktails';
import Spirits from './Spirits';
import Search from './Search';
import SignUp from './SignUp';
import { Element } from 'react-scroll';

const Home = ({ popular, latest }) => {
  return (
    <>
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
