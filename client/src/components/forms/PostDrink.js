import React, { useState } from 'react';
import apiService from '../../APIService/cocktails-db-api';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import { useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';

const PostDrink = () => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const navLinks = ['Cocktails', 'Spirits', 'Search'];

  const [cocktail, setCocktail] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    picture: '',
  });

  const { name, ingredients, instructions, picture } = cocktail;

  const onChange = e => setCocktail({ ...cocktail, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    apiService.createCocktail(cocktail);
    setCocktail({
      name: '',
      ingredients: '',
      instructions: '',
      picture: '',
    });
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
