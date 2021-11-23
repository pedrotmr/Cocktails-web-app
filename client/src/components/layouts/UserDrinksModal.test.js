import { Provider } from 'react-redux'
import {render, screen} from '@testing-library/react';
import UserDrinksModal from './UserDrinksModal';
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink'
import { turnOnUserMadeDrink } from '../../redux/features/userMadeDrink/userMadeDrink'
import userEvent  from '@testing-library/user-event';
import * as redux from 'react-redux';

let store;
const testCocktail = {
  name:'test-name',
  ingredients:'test-ingredients',
  instructions:'test-instructions',
  picture:'test-picture'
}
describe('User Modal component', () => {
  beforeEach(() => {
    store = createMockStore();
    store.dispatch(changeCurrentDrink(testCocktail))
  })
  test('should render the proper drink', () => {
    const history = createMemoryHistory()
    render(
      <Provider store = {store}>
        <Router location ={history.location} navigator ={history}>
          <UserDrinksModal />
        </Router>
      </Provider>
    )
    screen.getByText(/test-name/);
    const updateButton = screen.queryByRole('button', { name: 'update'});
    expect(updateButton).toBeNull()
  })

  test('should render update drink button and delete drink button if its user made', () =>{
    const history = createMemoryHistory()
    store.dispatch(turnOnUserMadeDrink());
    render(
      <Provider store = {store}>
        <Router location ={history.location} navigator ={history}>
          <UserDrinksModal />
        </Router>
      </Provider>
    )
    screen.getByRole('button', { name: 'Update Drink'})
    screen.getByRole('button', { name: 'Delete'})
  })


})