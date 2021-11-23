import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import MyBar from './MyBar';
// import {login, logout, isAuthenticated} from '../../redux/features/users/users.auth';
// import reducer from '../../redux/features/users/users.auth'
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {login} from '../../redux/features/users/users.auth';
import apiService from '../../APIService/cocktails-db-api';
import { setUser } from '../../redux/features/users/currUser';

let store;
const mockUser = {
  name:'Name',
}

describe('should properly call functions', () => {
  beforeEach(() => {
    store = createMockStore();
    store.dispatch(setUser(mockUser))
  })
  
  test('call db to get users drinks', () => {
    const history = createMemoryHistory();
    const spyOnUserCocktails = jest.spyOn(apiService, 'getAllUsersCocktails');
    render(
      <Provider store = {store}>
        <Router location={history.location} navigator={history}>
          <MyBar />
        </Router>
      </Provider>
    )
    expect(spyOnUserCocktails).toHaveBeenCalled()
  })

  test('call db to get specific users drink', () => {
    const history = createMemoryHistory();
    const spyOnUserCocktails = jest.spyOn(apiService, 'getAllUsersCocktails');
    render(
      <Provider store = {store}>
        <Router location={history.location} navigator={history}>
          <MyBar />
        </Router>
      </Provider>
    )
    expect(spyOnUserCocktails).toHaveBeenCalled()
  })
})