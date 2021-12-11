import React from 'react';
import Carrousel from '../../layouts/Carrousel';
import {
  useGetPopularCocktailsQuery,
  useGetLatestCocktailsQuery,
} from '../../../APIService/cocktails-api';

const Cocktails = () => {
  // +fix: make this dynamic and set state for each type
  const { data: popular = [], isFetching: popularFetch } = useGetPopularCocktailsQuery();
  const { data: latest = [], isFetching: latestFetch } = useGetLatestCocktailsQuery();

  return (
    <>
      <div className='section section'>
        <div className='section__cocktails'>
          {!popularFetch && <Carrousel list={popular.drinks} title={'Popular Drinks'} />}
          {!latestFetch && <Carrousel list={latest.drinks} title={'Latest Drinks'} />}
        </div>
      </div>
    </>
  );
};

export default Cocktails;
