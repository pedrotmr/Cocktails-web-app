import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../../redux/features/sidebar/sidebar';
import { HashLink, NavHashLink } from 'react-router-hash-link';

const Sidebar = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.userAuth.value);

  // DID NO THAVE TIME TO FINISH -> PRETTY MUCH THE SAME LOGIC AS THE NAVBAR

  return (
    <Fade top duration={300}>
      <div className='sidebar' onClick={() => dispatch(toggleSideBar())}>
        <div className='sidebar__icon'>
          <FaTimes />
        </div>
        <div className='sidebar__wrapper'>
          <ul className='sidebar__wrapper__menu'>
            {props.navLinks &&
              props.navLinks.map(link => (
                <LinkScroll
                  className='menu-links menu-links--side'
                  to={link}
                  key={link}
                  onClick={() => dispatch(toggleSideBar())}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  {link}
                </LinkScroll>
              ))}
            {props.navSpirits &&
              props.navSpirits.map(link => (
                <LinkRouter
                  className='menu-links menu-links--side'
                  to={`/${link}`}
                  key={link}
                  onClick={() => dispatch(toggleSideBar())}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  {link}
                </LinkRouter>
              ))}
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
