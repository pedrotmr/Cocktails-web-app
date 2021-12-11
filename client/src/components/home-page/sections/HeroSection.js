import React, { useState, useEffect } from 'react';
import Video from '../../../assets/videos/video-3.mp4';
import { MdArrowForward, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/features/users/users.auth';
import { setUser } from '../../../redux/features/users/currUser';
import apiService from '../../../APIService/cocktails-db-api';

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const isAuthenticated = useSelector(state => state.userAuth.value);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const getProfile = async accessToken => {
    const userInfo = await apiService.loadUser(accessToken);
    if (userInfo) {
      dispatch(login());
      dispatch(setUser(userInfo));
      setUserName(userInfo.name);
    }
  };
  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken);
    }
  }, [accessToken]);

  return (
    <div className='hero'>
      <div className='hero__bg'>
        <video
          className='hero__bg__video'
          autoPlay
          loop
          muted
          src={Video}
          type='video/mp4'
        ></video>
        <div className='hero__bg--fade-video'></div>
      </div>
      <div className='hero__content'>
        <h1 className='hero__content__header'>
          {!isAuthenticated ? 'Cocktail Making Made Easy' : `Welcome back ${userName}!`}
        </h1>
        <p className='hero__content__paragraph'>
          {!isAuthenticated
            ? 'Sign up for a new account today and unlock all the features!'
            : `Let's start marking delious drinks... Have you shared any of your creations yet?`}
        </p>
        <div className='btn-wrap'>
          {!isAuthenticated ? (
            <Link
              className='btn-wrap__link btn-wrap__link--hero'
              to='/register'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Get started
              {hover ? (
                <MdArrowForward className='btn__icon' />
              ) : (
                <MdKeyboardArrowRight className='btn__icon' />
              )}
            </Link>
          ) : (
            <Link
              className='btn-wrap__link btn-wrap__link--hero'
              to='/profile'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Profile page
              {hover ? (
                <MdArrowForward className='btn__icon' />
              ) : (
                <MdKeyboardArrowRight className='btn__icon' />
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
