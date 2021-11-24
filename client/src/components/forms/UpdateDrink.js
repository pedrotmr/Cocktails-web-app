import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Navbar from '../menu/Navbar';
import { useNavigate } from 'react-router-dom';
import apiService from '../../APIService/cocktails-db-api';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/features/users/users.auth';
import { refreshUserDrinks } from '../../redux/features/userMadeDrink/allUserDrinks';
// import FileBase64 from 'react-file-base64';


const UpdateDrink = () => {
  const [drinkName, setDrinkName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [_id, set_Id] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();
  
  useEffect(() => {
    async function checkAuth() {
      const accessToken = localStorage.getItem('accessToken');
      const isAuth = await apiService.loadUser(accessToken);
      if (!isAuth) {
        dispatch(logout());
        navigate('/');
        return
      } else {dispatch(login())}
    }
    checkAuth()
    if (params) {
      setDrinkName(params.drinkName);
      setIngredients(params.ingredients);
      setInstructions(params.instructions);
      set_Id(params._id);
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem('accessToken');
    apiService.updateCocktail(_id, accessToken, {name: drinkName, ingredients, instructions});
    dispatch(refreshUserDrinks());
    navigate('/profile');
  }
  return (
    <>
    <Navbar scroll={'disable'}  />
      <div className='form--drinks'>
        <div className='form__wrapper'>
          <div className='form__content'>
            <form action='' className='form__form form__form--drinks' onSubmit={(e) => onSubmit(e)}>
              <h1 className='form__header'> Update Cocktail</h1>
              <label className='form__label'>Name of the Cocktails</label>
              <input
                type='text'
                name='name'
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                placeholder='Name your cocktail...'
                required
                className='form__input'
              />
              <label className='form__label'>Ingredients</label>
              <textarea
                type='text'
                name='ingredients'
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder='Specify the ingredients...'
                required
                className='form__input'
              />
              <label className='form__label'>Instructions</label>
              <textarea
                type='text'
                name='instructions'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder='Give the instructions...'
                required
                className='form__input'
              />
              {/* <FileBase64
                className='form__input'
                type='file'
                name='picture'
                multiple={false}
                required
                onDone={({ base64 }) => setCocktail({ ...cocktail, picture: base64 })}
              /> */}
              <input className='form__button' type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateDrink
