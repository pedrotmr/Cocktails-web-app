import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
//++ Drinks Modal not working
import DrinksModal from './DrinksModal';
import { fetchCocktail } from '../../APIService/cocktails-api';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink';

const Carrousel = props => {
  const drinkModalOpen = useSelector(state => state.drinksModal.value);
  const dispatch = useDispatch();

  const handleClick = async (e, id) => {
    const drink = await fetchCocktail(e.target.id);
    dispatch(changeCurrentDrink(drink.data.drinks[0]))
    dispatch(toggleDrinksModal());
  };

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
    <div>
      {drinkModalOpen  && (
        <>
          <Modal />
            <DrinksModal />
          <Modal />
        </>
      )}
      <div className='section__drinks-list'>
        <h1 className='section__header section__header'>{props.title}</h1>
        <Slider {...sliderSettings}>
          {props.list.map(drink => {
            return (
              <>
                <nav className='link' key={drink.idDrink}>
                  <div className='section__drinks-list__card'>
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      id={drink.idDrink}
                      onClick={(e) => handleClick(e, drink.idDrink)}
                    />
                    <h2>{drink.strDrink}</h2>
                  </div>
                </nav>
              </>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Carrousel;
