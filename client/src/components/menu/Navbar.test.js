import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
// import {login, logout, isAuthenticated} from '../../redux/features/users/users.auth';
// import reducer from '../../redux/features/users/users.auth'
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { toggleModalSignIn } from '../../redux/features/signIn-modal/signIn-modal';
import {login} from '../../redux/features/users/users.auth'

let store;

describe('Navbar adjusts for user auth status', () => {
  beforeEach(() => {
    store = createMockStore();
  })

  test('logged in user has correct links', () => {
    const history = createMemoryHistory()
    store.dispatch(login())
    const navLinks = ['Cocktails', 'Spirits', 'Search'];
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Navbar navLinks = {navLinks}/>
        </Router>
      </Provider>  
    )
    screen.getByText(/juicy/)
    screen.getByText(/Cocktails/)
    screen.getByText(/My Bar/)
    screen.getByText(/Post a Drink/)
    const signUp = screen.queryByText(/Sign Up/)
    expect(signUp).toBeNull()
  })



  test('user that is not logged in gets a sign in link', () => {
    const history = createMemoryHistory()
    const navLinks = ['Cocktails', 'Spirits', 'Search'];
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Navbar navLinks = {navLinks}/>
        </Router>
      </Provider>  
    )
    screen.getByText(/Sign Up/)
    screen.getByText(/Sign In/)
    const myBar = screen.queryByText(/My Bar/)
    expect(myBar).toBeNull()
  })




  test('Should render spirits instead of navlinks if passed', () => {
    const history = createMemoryHistory()
    const navSpirits = ['Vodka', 'Gin', 'Rum', 'Whiskey', 'Tequila', 'Brandy'];
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Navbar navSpirits = {navSpirits}/>
        </Router>
      </Provider>  
    )
    screen.getByText(/Vodka/)
    screen.getByText(/Gin/)
    const cocktails = screen.queryByText(/Cocktails/)
    expect(cocktails).toBeNull()
  })
  
})

