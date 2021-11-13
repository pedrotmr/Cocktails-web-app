import React, { useState } from 'react';

const Search = () => {
  const [input, setInput] = useState('');

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(input);
    setInput('');
  };

  return (
    <>
      <div className='section section--search'>
        <h1 className='section__header section__header--popular'>
          Search for a Cocktail
        </h1>

        <form onSubmit={handleSubmit}>
          <input type='text' name='text' value={input} onChange={handleChange} />
          <button tupe='submit'>Add Todo</button>
        </form>
      </div>
    </>
  );
};

export default Search;
