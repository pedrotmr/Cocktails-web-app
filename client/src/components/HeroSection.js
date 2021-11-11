import React, { useState } from 'react';
import Video from './../assets/videos/video-3.mp4';
import { MdArrowForward, MdKeyboardArrowRight } from 'react-icons/md';
import { Link as LinkScroll } from 'react-scroll';

const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <div className='hero' id='home'>
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
        <h1 className='hero__content__header'>Cocktail Making Made Easy</h1>
        <p className='hero__content__paragraph'>
          Sign up for a new account today and start making delicious drinks!
        </p>
        <div className='btn-wrap'>
          <LinkScroll
            className='btn-wrap__link btn-wrap__link--hero'
            to='signup'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Get started
            {hover ? (
              <MdArrowForward className='btn__icon' />
            ) : (
              <MdKeyboardArrowRight className='btn__icon' />
            )}
          </LinkScroll>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
