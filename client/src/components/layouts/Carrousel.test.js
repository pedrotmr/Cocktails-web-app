import { Provider } from 'react-redux'
import {render, screen} from '@testing-library/react';
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent  from '@testing-library/user-event';
import Carrousel from './Carrousel';
import { fetchCocktail } from '../../APIService/cocktails-api';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink';
import { setUser } from '../../redux/features/users/currUser'
let store, history;
const mockCocktailArray = [
  {
    strDrink:'test-name',
    strDrinkThumb:'test-picture',
    idDrink:1,
  }
]
const mockCocktail = {
  strDrink:'test-name',
  strDrinkThumb:'test-picture',
  idDrink:1,
}

describe('Login Component', () => {
  beforeEach(() => {
    store = createMockStore()
    history = createMemoryHistory()
    store.dispatch(setUser({savedDrinks:mockCocktail}))
  })

  test(`should render modal when drink modal open is true`, () => {
    store.dispatch(changeCurrentDrink(mockCocktail));

    render(
      <Provider store={store} >
        <Router location ={history.location} navigator ={history} >
            <Carrousel list = {mockCocktailArray}></Carrousel>
        </Router>
      </Provider>
    )
    screen.getByText(/test-name/);
  })
})