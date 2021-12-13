import React from 'react';
import Carrousel from '../../layouts/Carrousel';
import {
  useGetPopularCocktailsQuery,
  useGetLatestCocktailsQuery,
} from '../../../APIService/cocktails-api';

const Cocktails = () => {
  const { data: popular = [], isFetching: popularFetch } = useGetPopularCocktailsQuery();
  const { data: latest = [], isFetching: latestFetch } = useGetLatestCocktailsQuery();

  return (
    <>
      <div className='section section'>
        <div className='section__cocktails'>
          <div className='section__wrapper'>
            {!popularFetch && (
              <Carrousel list={popular.drinks} title={'Popular Drinks'} />
            )}
            {!latestFetch && <Carrousel list={latest.drinks} title={'Latest Drinks'} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cocktails;
