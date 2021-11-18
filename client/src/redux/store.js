import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cocktailsApi } from '../APIService/cocktails-api';
import sideBarReducer from './features/sidebar/sidebar';
import userAuthReducer from './features/users/users.auth';
import modalSignInReducer from './features/signIn-modal/signIn-modal';
import favouritesReducer from './features/favourites/favourites';
import drinksModalReducer from './features/drinks-modal/drinks-modal';

export const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    userAuth: userAuthReducer,
    modalSignIn: modalSignInReducer,
    favourites: favouritesReducer,
    drinksModal: drinksModalReducer,
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(cocktailsApi.middleware);
  },
});

setupListeners(store.dispatch);
