import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import DrinksModal from './DrinksModal';
import { fetchCocktail } from '../../APIService/cocktails-api';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink';

const Carrousel = props => {
  const [drinkModalOpen, setDrinkModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (e, id) => {
    const drink = await fetchCocktail(e.target.id);
    dispatch(changeCurrentDrink(drink.data.drinks[0]));
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
          slidesToShow: Math.min(props.list.length, 1.5),
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
      {drinkModalOpen && (
        <>
          <Modal />
          <DrinksModal setState={setDrinkModalOpen} />
          <Modal />
        </>
      )}
      <div className='section__drinks-list'>
        <h1 className='section__header section__header'>{props.title}</h1>
        <Slider {...sliderSettings}>
          {props.list.map(drink => {
            return (
              <div key={drink.idDrink}>
                <nav className='link' key={drink.idDrink}>
                  <div className='section__drinks-list__card'>
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      id={drink.idDrink}
                      onClick={e => handleClick(e, drink.idDrink)}
                    />
                    <h2>{drink.strDrink}</h2>
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

export default Carrousel;
