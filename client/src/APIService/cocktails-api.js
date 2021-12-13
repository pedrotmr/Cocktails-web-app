import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// Trying fecthing method from reduz tookil
// Downside: cannot be used inside other functions i.e useEffect
export const cocktailsApi = createApi({
  reducerPath: 'cocktailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.thecocktaildb.com/api/json/v2/9973533',
  }),
  endpoints: builder => ({
    getPopularCocktails: builder.query({
      query: () => 'popular.php',
    }),
    getLatestCocktails: builder.query({
      query: () => 'latest.php',
    }),
    getSpiritsByType: builder.query({
      query: spirit => `filter.php?i=${spirit}`,
    }),
    getCocktailInfo: builder.query({
      query: id => `lookup.php?i=${id}`,
    }),
  }),
});

// Fetching from multiples parameters
export const fetchAllDrinks = ([...args], setState) => {
  return args.map(arg => {
    return axios
      .get(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${arg}`)
      .then(res => {
        setState(prev => [...prev, ...res.data.drinks]);
        return res;
      })
      .catch(err => console.log(err));
  });
};

export const searchDrinks = async (input, setState) => {
  const ingr = await axios
    .get(`https://www.thecocktaildb.com/api/json/v2/1/filter.php?i=${input}`)
    .then(res => {
      if (res.data.drinks !== 'None Found') {
        return res.data.drinks;
      } else return [];
    })
    .catch(err => console.log(err));

  const drinks = await axios
    .get(`https://www.thecocktaildb.com/api/json/v2/1/search.php?s=${input}`)
    .then(res => {
      if (res.data.drinks !== null) {
        return res.data.drinks;
      } else return [];
    })
    .catch(err => console.log(err));

  const results = [];
  ingr.length && results.push(...ingr);
  drinks.length && results.push(...drinks);
  setState([...drinks, ...ingr]);
  return results;
};

export const fetchCocktail = input => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v2/1/lookup.php?i=${input}`)
    .then(res => res)
    .catch(err => console.log(err));
};

export const {
  useGetPopularCocktailsQuery,
  useGetLatestCocktailsQuery,
  useGetSpiritsByTypeQuery,
  useGetCocktailInfoQuery,
  useSearchCocktailQuery,
} = cocktailsApi;
