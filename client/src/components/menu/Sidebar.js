import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';

const Sidebar = ({ toggleSideBar }) => {
  const navLinks = ['Cocktails', 'Spirits', 'Sign Up'];
  return (
    <Fade top duration={300}>
      <div className='sidebar' onClick={toggleSideBar}>
        <div className='sidebar__icon'>
          <FaTimes />
        </div>
        <div className='sidebar__wrapper'>
          <ul className='sidebar__wrapper__menu'>
            {navLinks.map(link => (
              <LinkScroll
                className='menu-links menu-links--side'
                to={link}
                key={link}
                onClick={toggleSideBar}
              >
                {link}
              </LinkScroll>
            ))}
            <LinkRouter className='menu-links menu-links--side' to='/mybar'>
              My Bar
            </LinkRouter>
            <LinkRouter className='menu-links menu-links--side' to='/postdrink'>
              Post a Drink
            </LinkRouter>
          </ul>
          <nav className='btn-wrap'>
            <LinkRouter className='btn-wrap__link btn-wrap__link--side' to='/signin'>
              Sign In
            </LinkRouter>
          </nav>
        </div>
      </div>
    </Fade>
  );
};

export default Sidebar;
