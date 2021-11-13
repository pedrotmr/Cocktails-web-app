import React, { useState, useEffect } from 'react';
import { Link as LinkRouter, Routes, Route } from 'react-router-dom';
import { Link as LinkScroll, animateScroll as scroll } from 'react-scroll';
import { FaBars } from 'react-icons/fa';
import SignIn from '../forms/SignIn';

const Navbar = ({ toggleSideBar }) => {
  const navLinks = ['Cocktails', 'Spirits', 'Search', 'Sign Up'];
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () =>
    window.scrollY >= 80 ? setScrollNav(true) : setScrollNav(false);

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => scroll.scrollToTop();

  return (
    <div
      className='navbar'
      style={scrollNav ? { background: '#000' } : { background: 'transparent' }}
    >
      <div className='navbar__container'>
        <LinkRouter className='navbar__logo' to='/' onClick={toggleHome}>
          juicy
        </LinkRouter>
        <div className='navbar__mobile-icon' onClick={toggleSideBar}>
          <FaBars />
        </div>
        <ul className='navbar__menu'>
          {navLinks.map(link => (
            <LinkScroll
              className='menu-links menu-links--nav'
              to={link}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              key={link}
              activeClass='menu-links--active'
            >
              {link}
            </LinkScroll>
          ))}
          {/* <LinkRouter className='menu-links menu-links--nav' to='/mybar'>
            My Bar
          </LinkRouter>
          <LinkRouter className='menu-links menu-links--nav' to='/postdrink'>
            Post a Drink
          </LinkRouter> */}
        </ul>
        <nav className='btn-wrap btn-wrap--nav'>
          <LinkRouter className='btn-wrap__link btn-wrap__link--nav' to='/signin'>
            Sign In
          </LinkRouter>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
