import React from 'react';
import './menu.scss';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ toggleSideBar }) => {
  const navLinks = ['About', 'Cocktails', 'Spirits', 'My Bar', 'Sign Up'];
  return (
    <div className='sidebar' onClick={toggleSideBar}>
      <div className='sidebar__icon'>
        <FaTimes className='sidebar__icon__close' />
      </div>
      <div className='sidebar__wrapper'>
        <ul className='sidebar__wrapper__menu'>
          {navLinks.map(link => (
            <LinkScroll
              className='menu-links menu-links--side'
              to={link}
              onClick={toggleSideBar}
            >
              {link}
            </LinkScroll>
          ))}
        </ul>
        <nav className='menu-button'>
          <LinkRouter className='menu-button__link menu-button__link--side' to='/signin'>
            Sign In
          </LinkRouter>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
