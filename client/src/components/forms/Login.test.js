import { Provider } from 'react-redux'
import {render, screen} from '@testing-library/react';
import Login from './Login';
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { toggleModalSignIn } from '../../redux/features/signIn-modal/signIn-modal'
import userEvent  from '@testing-library/user-event'

let store;
describe('Login Component', () => {
beforeEach(() => {
  store = createMockStore()
})

  test('should not render when modal sign in is false', () => {
    const history = createMemoryHistory()
    render(
      <Provider store={store} >
        <Router location ={history.location} navigator ={history} >
            <Login />
        </Router>
      </Provider>
    )
    let passwordShowing = screen.queryByPlaceholderText(/Password/);
    expect(passwordShowing).toBeNull()
  })

  test('should render an alert if form isnt filled out', () => {
    store.dispatch(toggleModalSignIn())
    const history = createMemoryHistory()
    render(
      <Provider store={store} >
        <Router location ={history.location} navigator ={history} >
            <Login />
        </Router>
      </Provider>
    )
  let passwordShowing = screen.getByPlaceholderText(/Password/);
  let submitButton = screen.getByRole('button', {name: 'Continue'});
  userEvent.type(passwordShowing, '');
  userEvent.click(submitButton)
  screen.getByText(/Please fill in all the fields/)
  })


})