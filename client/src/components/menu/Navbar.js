import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSideBar }) => {
  const navLinks = ['Cocktails', 'Spirits', 'Search'];

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
            <LinkScroll className='menu-links menu-links--nav' to={link} key={link}>
              {link}
            </LinkScroll>
          ))}
          <LinkRouter className='menu-links menu-links--nav' to='/mybar'>
            My Bar
          </LinkRouter>
          <LinkRouter className='menu-links menu-links--nav' to='/postdrink'>
            Post a Drink
          </LinkRouter>
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
