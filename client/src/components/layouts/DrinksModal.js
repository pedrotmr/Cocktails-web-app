import React, {useEffect, useState} from 'react';
import { FaHeart } from 'react-icons/fa';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { useDispatch, useSelector } from 'react-redux';

const DrinksModal = ({ data }) => {
  const dispatch = useDispatch();
  const currentDrink = useSelector(state => state.currentDrink.drinks);
  // const [currentDrink, setCurrentDrink] = useState('')
  // console.log(currentDrink, 'this is cur drink from modal')
  // useEffect(() => {
  //   if(data.idDrink)
  //   setCurrentDrink(data)
  // },[data])
  // +fix: props being passed thru, also see carousel component
  console.log(currentDrink, 'this is the current drink')
  return (
    <>
    {currentDrink && 
      <div>
      <div className='global-bg' onClick={() => dispatch(toggleDrinksModal())}></div>
      <div className='drink-modal'>
        {/* + fix dispatch below */}
        <FaHeart className='drink-modal__like' onClick={dispatch} />
        <div className='drink-modal__wrapper'>
          <div className='drink-modal__img-wrapper'>
            <img src={currentDrink.strDrinkThumb} alt={currentDrink.strDrink} />
          </div>

          <div className='drink-modal__info__wrapper'>
            <h1 className='drink-modal__name'>{currentDrink.strDrink}</h1>

            <div className='drink-modal__ingredients'>
              {/* + loop through/dynamic? */}
              {/* <table>
                <tr>
                  <th>Measure</th>
                  <th>Ingredients</th>
                </tr>
                <tr>
                  <td>{currentDrink.strMeasure1}</td>
                  <td>{currentDrink.strIngredient1}</td>
                </tr>
                <tr>
                  <td>{currentDrink.strMeasure2}</td>
                  <td>{currentDrink.strIngredient2}</td>
                </tr>
                <tr>
                  <td>{currentDrink.strMeasure3}</td>
                  <td>{currentDrink.strIngredient3}</td>
                </tr>
                <tr>
                  <td>{currentDrink.strMeasure4}</td>
                  <td>{currentDrink.strIngredient4}</td>
                </tr>
                <tr>
                  <td>{currentDrink.strMeasure5}</td>
                  <td>{currentDrink.strIngredient5}</td>
                </tr>
                <tr>
                  <td>{currentDrink.strMeasure6}</td>
                  <td>{currentDrink.strIngredient6}</td>
                </tr>
              </table> */}
              <div className='drink-modal__intructions'>
                <p>{currentDrink.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>}
    </>
  );
};

export default DrinksModal;
