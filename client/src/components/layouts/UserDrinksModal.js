import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { useDispatch, useSelector } from 'react-redux';

const UserDrinksModal = ( ) => {
  const currentDrink = useSelector(state => state.currentDrink.drinks);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div className='global-bg' onClick={() => dispatch(toggleDrinksModal())}></div>
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
