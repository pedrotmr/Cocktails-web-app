import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleDown } from 'react-icons/fa';
import DrinksModal from '../layouts/DrinksModal';
import Modal from 'react-modal';
import { fetchCocktail } from '../../APIService/cocktails-api';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink';
import { useSelector, useDispatch } from 'react-redux';
const SpiritsGrid = props => {
  const dispatch = useDispatch();
  // const drinkModalOpen = useSelector(state => state.drinksModal.value);
  const [ drinkModalOpen, setDrinkModalOpen ] = useState(false);
  const handleClick = async (e, id) => {
    const drink = await fetchCocktail(e.target.id);
    dispatch(changeCurrentDrink(drink.data.drinks[0]))
    // dispatch(toggleDrinksModal());
    setDrinkModalOpen(true);
  };
  return (
    <>
    <div>
    {drinkModalOpen  && (
        <>
          <Modal />
            <DrinksModal setState={setDrinkModalOpen} />
          <Modal />
        </>
      )}
      <div className='spirits__hero'>
        <div className={props.title}></div>
      </div>

      <div className='spirits__header'>
        <h1>{props.title}</h1>
        <FaAngleDoubleDown className='spirits__header__arrow' />
      </div>

      <div className='spirits__grid'>
        {props.list.map(drink => {
          return (
            // update to be modal popup instead of new page
            <div key = {drink.idDrink}>
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
          </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default SpiritsGrid;
