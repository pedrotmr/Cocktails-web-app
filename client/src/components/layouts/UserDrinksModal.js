import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffUserMadeDrink } from '../../redux/features/userMadeDrink/userMadeDrink'
import { useNavigate } from 'react-router-dom';
import apiService from '../../APIService/cocktails-db-api';
const UserDrinksModal = ({ setState }) => {
  const currentDrink = useSelector(state => state.currentDrink.drinks);
  const userMadeDrink = useSelector(state => state.userMadeDrink.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className='global-bg' onClick={() => {
          setState(false)
          if(userMadeDrink) {
          dispatch(turnOffUserMadeDrink())
          }
          }}></div>
        <div className='drink-modal'>
        {/* + fix dispatch below */}
        <FaHeart className='drink-modal__like' onClick={dispatch} />
        <div className='drink-modal__wrapper'>
          <div className='drink-modal__img-wrapper'>
          <img src={currentDrink.picture} alt={currentDrink.name} />
          </div>
          <div className='drink-modal__info__wrapper'>
            <h1 className='drink-modal__name'>{currentDrink.name}</h1>
          <div className='drink-modal__intructions'>
                <p style ={{fontSize:'1.8rem'}}> Instructions: </p>
                <p>{currentDrink.instructions}</p>
            <div className='drink-modal__ingredients'>
                <p style ={{fontSize:'1.8rem'}}> Ingredients: </p>
                <p>{currentDrink.ingredients}</p>
            </div>
            </div>
            </div>
          </div>
          <div className='button-wrapper'>
            {userMadeDrink && <button className='btn'  onClick={
              () => {
                navigate(`/updateDrink/${currentDrink.name}/${currentDrink.ingredients}/${currentDrink.instructions}/${currentDrink._id}`)
                dispatch(toggleDrinksModal());
                dispatch(turnOffUserMadeDrink())
              }
            }>Update Drink</button>}
            {
              userMadeDrink && <button className='btn' onClick = {() => {
                const accessToken = localStorage.getItem('accessToken');
                apiService.deleteCocktail(currentDrink._id, accessToken);
                dispatch(toggleDrinksModal());
                dispatch(turnOffUserMadeDrink())
              }}>Delete</button>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default UserDrinksModal
