import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
// import {login, logout, isAuthenticated} from '../../redux/features/users/users.auth';
// import reducer from '../../redux/features/users/users.auth'
import { createMockStore } from '../../utils/mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { toggleModalSignIn } from '../../redux/features/signIn-modal/signIn-modal';

let store;

describe('Navbar adjusts for user auth status', () => {
  beforeEach(() => {
    store = createMockStore();
  })

  test('logged in user has correct links', () => {
    const history = createMemoryHistory()
    // store.dispatch(toggleModalSignIn())

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Navbar navbar={['Test1', 'Test2', 'Test3']}/>
        </Router>
      </Provider>  
    )
  })
})

// function render(
//   ui,
//   {
//     preloadedState,
//     store = configureStore({ reducer: { user: userReducer }, preloadedState }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
// }

// // re-export everything
// export * from '@testing-library/react'
// // override render method
// export { render }