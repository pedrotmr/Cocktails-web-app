import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
//++ Drinks Modal not working
import apiService from '../../APIService/cocktails-db-api';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink';
import { turnOnUserMadeDrink } from '../../redux/features/userMadeDrink/userMadeDrink';
import UserDrinksModal from './UserDrinksModal';

const CarrouselDB = props => {
  const [ drinkModalOpen, setDrinkModalOpen ] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (e, id) => {
    const drink = await apiService.getCocktail(e.target.id);
    dispatch(changeCurrentDrink(drink))
    if(props.userDrinks) {
      dispatch(turnOnUserMadeDrink())
    }
    setDrinkModalOpen(true);
  };
  const sliderSettings = {
    infinite: true,
    slidesToShow: Math.min(props.list.length, 4),
    slidesToScroll: 2,
    speed: 500,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: Math.min(props.list.length, 3.5),
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1010,
        settings: {
          slidesToShow: Math.min(props.list.length, 3),
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: Math.min(props.list.length, 2.5),
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: Math.min(props.list.length, 2),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: Math.min(props.list.length, 1.6),
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: Math.min(props.list.length, 1),
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
            <UserDrinksModal  setState={setDrinkModalOpen} userDrinks = {props.userDrinks} />
          <Modal />
        </>
      )}
      <div className='section__drinks-list'>
        <h1 className='section__header section__header'>{props.title}</h1>
        <Slider {...sliderSettings}>
          {props.list.map(drink => {
            return (
              <div key ={drink._id}>
                <nav className='link' key={drink._id}>
                  <div className='section__drinks-list__card'>
                    <img 
                      height='200px'
                      width='200px'
                      src={drink.picture} 
                      alt={drink.name} 
                      id={drink._id}
                      onClick = {handleClick} />
                    <h2>{drink.name}</h2>
                  </div>
                </nav>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default CarrouselDB;
