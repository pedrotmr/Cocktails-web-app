import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { useDispatch } from 'react-redux';

const DrinksModal = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className='global-bg' onClick={() => dispatch(toggleDrinksModal())}></div>
      <div className='drink-modal'>
        <FaHeart className='drink-modal__like' onClick={dispatch} />
        <div className='drink-modal__wrapper'>
          <div className='drink-modal__img-wrapper'>
            <img src={data.strDrinkThumb} alt={data.strDrink} />
          </div>

          <div className='drink-modal__info__wrapper'>
            <h1 className='drink-modal__name'>{data.strDrink}</h1>

            <div className='drink-modal__ingredients'>
              <table>
                <tr>
                  <th>Measure</th>
                  <th>Ingredients</th>
                </tr>
                <tr>
                  <td>{data.strMeasure1}</td>
                  <td>{data.strIngredient1}</td>
                </tr>
                <tr>
                  <td>{data.strMeasure2}</td>
                  <td>{data.strIngredient2}</td>
                </tr>
                <tr>
                  <td>{data.strMeasure3}</td>
                  <td>{data.strIngredient3}</td>
                </tr>
                <tr>
                  <td>{data.strMeasure4}</td>
                  <td>{data.strIngredient4}</td>
                </tr>
                <tr>
                  <td>{data.strMeasure5}</td>
                  <td>{data.strIngredient5}</td>
                </tr>
                <tr>
                  <td>{data.strMeasure6}</td>
                  <td>{data.strIngredient6}</td>
                </tr>
              </table>
              <div className='drink-modal__intructions'>
                <p>{data.strInstructions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrinksModal;
