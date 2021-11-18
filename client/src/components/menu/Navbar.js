import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { FaBars } from 'react-icons/fa';
import Modal from 'react-modal';
import Login from '../forms/Login';
import { NavHashLink } from 'react-router-hash-link';
import apiService from '../../APIService/cocktails-db-api';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/users/users.auth';
import { toggleSideBar } from '../../redux/features/sidebar/sidebar';
import { toggleModalSignIn } from '../../redux/features/signIn-modal/signIn-modal';

const Navbar = props => {
  const [scrollNav, setScrollNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInModalOpen = useSelector(state => state.modalSignIn.value);
  const isAuthenticated = useSelector(state => state.userAuth.value);

  const changeNav = () =>
    window.scrollY >= 80 ? setScrollNav(true) : setScrollNav(false);

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  // if Authenticated ? display SignUp : display MyBar
  const authLink = !isAuthenticated ? (
    <Link
      className='menu-links menu-links--nav'
      to='/register'
      activeClassName='menu-links--active'
    >
      Sign Up
    </Link>
  ) : (
    <>
      <Link
        className='menu-links menu-links--nav'
        to='/profile'
        activeClass='menu-links--active'
      >
        My Bar
      </Link>
      <Link
        className='menu-links menu-links--nav'
        to='/postDrink'
        activeClass='menu-links--active'
      >
        Post a Drink
      </Link>
    </>
  );

  const logOut = () => {
    const accessToken = localStorage.getItem('accessToken');
    apiService.logout(accessToken);
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <div
        className='navbar'
        // Change color of navbar on scroll
        style={
          scrollNav || props.scroll
            ? { background: '#000' }
            : { background: 'transparent' }
        }
      >
        <div className='navbar__container'>
          <Link
            className='navbar__logo'
            to='/'
            onClick={() => scroll.scrollToTop()}
            // Change logo color to black on register page ir props.black
            style={
              props.black ? { color: '#000', fontSize: '3.5rem' } : { color: '#fff' }
            }
          >
            juicy
          </Link>

          {/* No sidebar on register page */}
          {!props.register && (
            <div
              className='navbar__mobile-icon'
              onClick={() => dispatch(toggleSideBar())}
            >
              <FaBars />
            </div>
          )}

          {/* START LINKS FROM THE NAVBAR */}
          <ul className='navbar__menu'>
            {props.navLinks &&
              props.navLinks.map(link => (
                <NavHashLink
                  className='menu-links menu-links--nav'
                  to={`/#${link}`}
                  scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                  key={link}
                  activeClassName='menu-links--active'
                >
                  {link}
                </NavHashLink>
              ))}
            {/* Conditional: if are the navLinks and is authenticated or not */}
            {props.navLinks && authLink}

            {/* If are the navSpiritsLink -> display those */}
            {props.navSpirits &&
              props.navSpirits.map(link => (
                <Link className='menu-links menu-links--nav' to={`/${link}`} key={link}>
                  {link}
                </Link>
              ))}
          </ul>
          {/* END LINKS FROM THE NAVBAR */}

          {/* Sign In or Logout Button */}
          <nav className='btn-wrap btn-wrap--nav'>
            {/* Do not display button on register page */}
            {!props.register && (
              <button
                className='btn-wrap__link btn-wrap__link--nav'
                // {!isAuthenticated ? 'Sign In' : 'Logout'}
                onClick={() =>
                  !isAuthenticated ? dispatch(toggleModalSignIn()) : logOut()
                }
              >
                {!isAuthenticated ? 'Sign In' : 'Logout'}
              </button>
            )}
            <Modal isOpen={signInModalOpen} />
            <Login />
            <Modal />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
