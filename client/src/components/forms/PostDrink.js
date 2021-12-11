import React, { useState, useEffect } from 'react';
import apiService from '../../APIService/cocktails-db-api';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import { useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, login } from '../../redux/features/users/users.auth';

const PostDrink = () => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const navLinks = ['Cocktails', 'Spirits', 'Search'];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    name: '',
    ingredients: '',
    instructions: '',
    picture: '',
  }

  const [cocktail, setCocktail] = useState(initialState);

  const { name, ingredients, instructions } = cocktail;

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
  }, []);

  const onChange = e => setCocktail({ ...cocktail, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    apiService.createCocktail(cocktail, accessToken);
    setCocktail(initialState);
    navigate('/profile')
  };

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar scroll={'disable'} navLinks={navLinks} />
      <div className='form--drinks'>
        <div className='form__wrapper'>
          <div className='form__content'>
            <form action='' className='form__form form__form--drinks' onSubmit={onSubmit}>
              <h1 className='form__header'> Add New Cocktail</h1>
              <label className='form__label'>Name of the Cocktails</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                placeholder='Name your cocktail...'
                required
                className='form__input'
              />
              <label className='form__label'>Ingredients</label>
              <textarea
                type='text'
                name='ingredients'
                value={ingredients}
                onChange={onChange}
                placeholder='Specify the ingredients...'
                required
                className='form__input'
              />
              <label className='form__label'>Instructions</label>
              <textarea
                type='text'
                name='instructions'
                value={instructions}
                onChange={onChange}
                placeholder='Give the instructions...'
                required
                className='form__input'
              />
              <label className='form__label'>Picture</label>
              <FileBase64
                className='form__input'
                type='file'
                name='picture'
                multiple={false}
                required
                onDone={({ base64 }) => setCocktail({ ...cocktail, picture: base64 })}
              />
              <input className='form__button' type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDrink;
