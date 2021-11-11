import React from 'react';
import './menu.scss';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSideBar }) => {
  const navLinks = ['About', 'Cocktails', 'Spirits', 'My Bar', 'Sign Up'];

  return (
    <div className='navbar'>
      <div className='navbar__container'>
        <LinkRouter className='navbar__logo' to='/'>
          juicy
        </LinkRouter>
        <div className='navbar__mobile-icon' onClick={toggleSideBar}>
          <FaBars />
        </div>
        <ul className='navbar__menu'>
          {navLinks.map(link => (
            <LinkScroll className='menu-links menu-links--nav' to={link}>
              {link}
            </LinkScroll>
          ))}
        </ul>
        <nav className='menu-button menu-button--nav'>
          <LinkRouter className='menu-button__link menu-button__link--nav' to='/signin'>
            Sign In
          </LinkRouter>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
