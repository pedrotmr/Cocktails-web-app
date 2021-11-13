import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Cocktails = ({ popular, latest }) => {
  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    speed: 500,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1010,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <>
      <div className='section section--cocktails'>
        <div className='section__drinks-list section__drinks-list'>
          <h1 className='section__header section__header--popular'>Popular Drinks</h1>
          <Slider {...sliderSettings}>
            {popular.map(drink => {
              return (
                <Link to={drink.idDrink} id={drink.idDrink} className='link'>
                  <div className='section__drinks-list__card' key={drink.idDrink}>
                    <img src={drink.strDrinkThumb} alt='hero_img' />
                    <h2>{drink.strDrink}</h2>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
        <div className='section__drinks-list'>
          <h1 className='section__header'>Latest Drinks</h1>
          <Slider {...sliderSettings}>
            {latest.map(drink => {
              return (
                <Link to={drink.idDrink} id={drink.idDrink} className='link'>
                  <div className='section__drinks-list__card' key={drink.idDrink}>
                    <img src={drink.strDrinkThumb} alt='hero_img' />
                    <h2>{drink.strDrink}</h2>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Cocktails;
