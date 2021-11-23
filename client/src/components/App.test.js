// import { Provider } from 'react-redux';
// import { render, screen } from '@testing-library/react';
// import App from './App'
// import { createMockStore } from '../utils/mock-store';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import {fetchAllDrinks} from '../APIService/cocktails-api'
// import {login} from '../redux/features/users/users.auth';

// let store;

// describe('App makes proper fetch calls', () => {
//   beforeEach(() => {
//     store = createMockStore();
//   })
//   test('all fetch calls should be made on load', async () => {
//     const history = createMemoryHistory();
//     store.dispatch(login())
//     const spyOnFetch = jest.fn(fetchAllDrinks);
//     await render(
//       <Provider store={store}>
//           <App />
//       </Provider>  
//     )
//     expect(spyOnFetch).toHaveBeenCalled();
//   })
// })


