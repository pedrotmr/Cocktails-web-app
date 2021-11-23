import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { useDispatch, useSelector } from 'react-redux';
import apiService from '../../APIService/cocktails-db-api';
import { setUser } from '../../redux/features/users/currUser';

const DrinksModal = ({ data }) => {
  const dispatch = useDispatch();
  const currentDrink = useSelector(state => state.currentDrink.drinks);
  const currUser = useSelector(state => state.currUser.user);
  const [ favDrink, setFavDrink ] = useState(false);

  useEffect(() => {
    if(currUser.savedDrinks.length){
      currUser.savedDrinks.includes(currentDrink.idDrink) && setFavDrink(true)
    }
  }, [])

  async function updateFavList() {
    const accessToken = localStorage.getItem('accessToken')
    const updatedUser = await apiService.updateUserFavs(accessToken, currentDrink.idDrink);
    dispatch(setUser(updatedUser));
    setFavDrink(!favDrink);
  }

  return (
    <>
    {currentDrink && 
      <div>
      <div className='global-bg' onClick={() => dispatch(toggleDrinksModal())}></div>
      <div className='drink-modal'>
          <FaHeart className='drink-modal__like' 
            style={favDrink ? {color: "red"} : {color: "black"}} 
            onClick={updateFavList} 
          />
        <div className='drink-modal__wrapper'>
          <div className='drink-modal__img-wrapper'>
            <img src={currentDrink.strDrinkThumb} alt={currentDrink.strDrink} />
          </div>

          <div className='drink-modal__info__wrapper'>
            <h1 className='drink-modal__name'>{currentDrink.strDrink}</h1>

            <div className='drink-modal__ingredients'>
              {/* + loop through/dynamic? */}
              <table>
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
              </table>
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
