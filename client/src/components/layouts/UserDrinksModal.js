import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { useDispatch, useSelector } from 'react-redux';
import { turnOffUserMadeDrink } from '../../redux/features/userMadeDrink/userMadeDrink'
import { useNavigate } from 'react-router-dom';
import apiService from '../../APIService/cocktails-db-api';
const UserDrinksModal = ({ setState }) => {
  const currentDrink = useSelector(state => state.currentDrink.drinks);
  console.log(currentDrink.name, 'current drink');
  console.log('hello')
  const userMadeDrink = useSelector(state => state.userMadeDrink.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(currentDrink, 'currdrink')
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
          <div className='drink-modal__info__wrapper'>
            <h1 className='drink-modal__name'>{currentDrink.name}</h1>
            <div className='drink-modal__intructions'>
                <p>{currentDrink.instructions}</p>
                <p>{currentDrink.ingredients}</p>
                {userMadeDrink && <button onClick={
                  () => {
                    navigate(`/updateDrink/${currentDrink.name}/${currentDrink.ingredients}/${currentDrink.instructions}/${currentDrink._id}`)
                    dispatch(toggleDrinksModal());
                    dispatch(turnOffUserMadeDrink())
                  }
                }>Update Drink</button>}
                {
                  userMadeDrink && <button onClick = {() => {
                    const accessToken = localStorage.getItem('accessToken');
                    apiService.deleteCocktail(currentDrink._id, accessToken);
                    dispatch(toggleDrinksModal());
                    dispatch(turnOffUserMadeDrink())
                  }}>Delete</button>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default UserDrinksModal
