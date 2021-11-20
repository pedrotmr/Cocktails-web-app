import React, { useState } from 'react';
import Carrousel from '../../layouts/Carrousel';
import { searchDrinks } from '../../../APIService/cocktails-api';

const Search = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  console.log(result)
  const handleChange = e => setInput(e.target.value);


  // +add?: api call for drinks by name
  const handleSubmit = e => {
    e.preventDefault();
    searchDrinks(input, setResult);
    setInput('');
  };

  return (
    <>
      <div className='section section--search'>
        <h1 className='section__header section__header--popular'>
          Search for a Cocktail
        </h1>
        <div className='form-search'>
          <form onSubmit={handleSubmit} className='search'>
            <input
              className='search-input'
              type='text'
              name='text'
              placeholder='Search cocktails by ingredients...'
              value={input}
              onChange={handleChange}
            />
          </form>

          <div className='section__cocktails'>
            {result.length > 0 && <Carrousel list={result} title={'Result'} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
