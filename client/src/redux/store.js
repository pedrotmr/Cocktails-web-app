import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cocktailsApi } from '../APIService/cocktails-api';
import sideBarReducer from './features/sidebar/sidebar';
import userAuthReducer from './features/users/users.auth';
import currUserReducer from './features/users/currUser';
import modalSignInReducer from './features/signIn-modal/signIn-modal';
import favouritesReducer from './features/favourites/favourites';
import drinksModalReducer from './features/drinks-modal/drinks-modal';
import currentDrinkReducer from './features/currentDrink/currentDrink';
import userMadeDrinkReducer from './features/userMadeDrink/userMadeDrink';

export const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    userAuth: userAuthReducer,
    modalSignIn: modalSignInReducer,
    favourites: favouritesReducer,
    drinksModal: drinksModalReducer,
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    currentDrink: currentDrinkReducer,
    userMadeDrink: userMadeDrinkReducer,
    currUser: currUserReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cocktailsApi.middleware);
  },
});

setupListeners(store.dispatch);
