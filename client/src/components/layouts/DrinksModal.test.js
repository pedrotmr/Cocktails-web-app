import { Provider } from 'react-redux'
import {render, screen} from '@testing-library/react';
import DrinksModal from './UserDrinksModal';
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { changeCurrentDrink } from '../../redux/features/currentDrink/currentDrink'

let store;
const testCocktail = {
  name:'test-name',
  ingredients:'test-ingredients',
  instructions:'test-instructions',
  picture:'test-picture'
}
describe('Drink Modal component', () => {
  beforeEach(() => {
    store = createMockStore();
    store.dispatch(changeCurrentDrink(testCocktail))
  })
  test('should render the proper drink with no ability to update', () => {
    const history = createMemoryHistory()
    render(
      <Provider store = {store}>
        <Router location ={history.location} navigator ={history}>
          <DrinksModal />
        </Router>
      </Provider>
    )
    screen.getByText(/test-name/);
    const updateButton = screen.queryByRole('button', { name: 'update'});
    expect(updateButton).toBeNull()
  })
})