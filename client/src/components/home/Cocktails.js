import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Cocktails = ({ popular, latest }) => {
  const sliderSettings = {
    // className: 'center',
    // centerMode: true,
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
    <div className='section section--cocktails'>
      <div className='section__drinks-list section__drinks-list'>
        <h1 className='section__header section__header--popular'>Popular Drinks</h1>
        <Slider {...sliderSettings} className='section__drinks-slider'>
          {popular.map(drink => {
            return (
              <div className='card__container--inner--card' key={drink.idDrink}>
                <img src={drink.strDrinkThumb} alt='hero_img' />
                <h2>{drink.strDrink}</h2>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className='section__drinks-list'>
        <h1 className='section__header'>Latest Drinks</h1>
        <Slider {...sliderSettings} className='section__drinks-slider'>
          {latest.map(drink => {
            return (
              <div className='card__container--inner--card' key={drink.idDrink}>
                <img src={drink.strDrinkThumb} alt='hero_img' />
                <h2>{drink.strDrink}</h2>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Cocktails;

// return (
//   <div className='section section--cocktails'>
//     <h1 className='section__header'>Popular Drinks</h1>
//     <div className='section__drinks-slider'>
//       {popular.map(drink => {
//         return (
//           <div className='section__drinks-slider__container'>
//             {/* <ul> */}
//             {/* <li> */}
//             <a
//               router='/{{movie.id}}'
//               className='section__drinks-slider__container__item'
//             >
//               <img src={drink.strDrinkThumb} />
//             </a>
//             {/* </li> */}
//             {/* </ul> */}
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );
