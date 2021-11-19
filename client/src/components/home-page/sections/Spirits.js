import React from 'react';
import { Link } from 'react-router-dom';

const Spirits = () => {

  // refactor to be dynamic
  return (
    <>
      <div className='section section--spirits section--photoBg'>
        <div className='center-text'>
          <h1 className='section__header section__header--white'>Spirits</h1>
        </div>
        <div className='row'>
          <Link to='vodka'>
            <div className='row__image row__image--1'>
              <h2 className='row__image__title'>Vodka</h2>
            </div>
          </Link>
          <Link to='gin'>
            <div className='row__image row__image--2'>
              <h2 className='row__image__title'>Gin</h2>
            </div>
          </Link>
          <Link to='/rum'>
            <div className='row__image row__image--3'>
              <h2 className='row__image__title'>Rum</h2>
            </div>
          </Link>
          <Link to='/tequila'>
            <div className='row__image row__image--4'>
              <h2 className='row__image__title'>Tequila</h2>
            </div>
          </Link>
          <Link to='/whiskey'>
            <div className='row__image row__image--5'>
              <h2 className='row__image__title'>Whiskey</h2>
            </div>
          </Link>
          <Link to='/brandy'>
            <div className='row__image row__image--6'>
              <h2 className='row__image__title'>Brandy</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Spirits;
