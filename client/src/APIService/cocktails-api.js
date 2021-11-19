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
    getVodkaCocktails: builder.query({
      query: () => 'filter.php?i=vodka',
    }),
    getGinCocktails: builder.query({
      query: () => 'filter.php?i=gin',
    }),
    getCocktailInfo: builder.query({
      query: id => `lookup.php?i=${id}`,
    }),
  }),
});

// Fetching from multiples parameters
// + maybe refactor to set state in each component
export const fetchAllDrinks = ([...args], setState) => {
 return args.map(arg => {
   return axios
      .get(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${arg}`)
      .then(res => {
        setState(prev => [...prev, ...res.data.drinks])
        return res
      })
      .catch(err => console.log(err));
  });
};

export const searchDrinks = (input, setState) => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${input}`)
    .then(res => {
      setState(res.data.drinks)
      return res.data.drinks
    })
    .catch(err => console.log(err));
};

export const fetchCocktail = (input) => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${input}`)
    .then(res => res)
    .catch(err => console.log(err));
};

export const {
  useGetPopularCocktailsQuery,
  useGetLatestCocktailsQuery,
  useGetVodkaCocktailsQuery,
  useGetGinCocktailsQuery,
  useGetCocktailInfoQuery,
  useSearchCocktailQuery,
} = cocktailsApi;
