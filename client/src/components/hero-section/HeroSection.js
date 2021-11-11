import React from 'react';
import './heroSection.scss';
import Video from './../../assets/videos/video-3.mp4';

const HeroSection = () => {
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
    </div>
  );
};

export default HeroSection;
