import { configureStore } from '@reduxjs/toolkit';
import { cocktailsApi } from '../APIService/cocktails-api';
import sideBarReducer from '../redux/features/sidebar/sidebar';
import userAuthReducer from '../redux/features/users/users.auth';
import currUserReducer from '../redux/features/users/currUser';
import modalSignInReducer from '../redux/features/signIn-modal/signIn-modal';
import favouritesReducer from '../redux/features/favourites/favourites';
import drinksModalReducer from '../redux/features/drinks-modal/drinks-modal';
import currentDrinkReducer from '../redux/features/currentDrink/currentDrink';
import userMadeDrinkReducer from '../redux/features/userMadeDrink/userMadeDrink';
import userDrinksReducer from '../redux/features/userMadeDrink/allUserDrinks';

export const createMockStore = () => configureStore({
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
    userDrinks: userDrinksReducer
  }
});