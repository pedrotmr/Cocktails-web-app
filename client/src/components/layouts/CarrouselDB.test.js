import { Provider } from 'react-redux'
import {render, screen} from '@testing-library/react';
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent  from '@testing-library/user-event';
import CarrouselDB from './CarrouselDB';
import apiService from '../../APIService/cocktails-db-api';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink';
import { toggleDrinksModal } from '../../redux/features/drinks-modal/drinks-modal'

let store, history;
const mockCocktailArray = [
  {
    name:'test-name',
    ingredients:'test-ingredients',
    instructions:'test-instructions',
    picture:'test-picture',
    _id:1,
  }
]
const mockCocktail = {
  name:'test-name',
  ingredients:'test-ingredients',
  instructions:'test-instructions',
  picture:'test-picture'
}
describe('Login Component', () => {
  beforeEach(() => {
    store = createMockStore()
    history = createMemoryHistory()
  })
  
  test('should make a call to singular cocktail api on click', () => {
    const spyOnUserCocktails = jest.spyOn(apiService, 'getCocktail');
    render(
      <Provider store={store} >
        <Router location ={history.location} navigator ={history} >
            <CarrouselDB list = {mockCocktailArray}/>
        </Router>
      </Provider>
    )
    const img = screen.getByRole('img');
    userEvent.click(img);
    expect(spyOnUserCocktails).toHaveBeenCalled();
  })

  test(`should not render modal when drink modal open is false`, () => {
    store.dispatch(changeCurrentDrink(mockCocktail));
    render(
      <Provider store={store} >
        <Router location ={history.location} navigator ={history} >
            <CarrouselDB list = {mockCocktailArray}></CarrouselDB>
        </Router>
      </Provider>
    )
    const drinkName = screen.queryByText(/test-ingredients/);
    expect(drinkName).toBeNull()
  })
})