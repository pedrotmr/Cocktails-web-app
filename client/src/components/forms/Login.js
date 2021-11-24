import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { login } from '../../redux/features/users/users.auth';
import { toggleModalSignIn } from '../../redux/features/signIn-modal/signIn-modal';
import apiService from '../../APIService/cocktails-db-api';
import Alerts from '../helpers/Alerts';

const Login = () => {
  const signInModalOpen = useSelector(state => state.modalSignIn.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);

  const setAlertMsg = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (email === '' || password === '')
      return setAlertMsg('Please fill in all the fields', 'danger');
    const user = { email, password };
    const res = await apiService.login(user);
    console.log(res);
    if (res.error) {
      return setAlertMsg(res.message, 'danger');
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      dispatch(login());
      navigate('/');
      dispatch(toggleModalSignIn());
    }
  };

  return (
    <>
      {signInModalOpen && (
        <div>
          <div className='global-bg' onClick={() => dispatch(toggleModalSignIn())}></div>
          <div className='form'>
            <div className='form__wrapper'>
              <div className='form__content'>
                <form action='' className='form__form' onSubmit={onSubmit}>
                  <MdClose
                    className='form__icon'
                    onClick={() => dispatch(toggleModalSignIn())}
                  />
                  <Alerts alert={alert} />
                  <h1 className='form__header'> Sign in to your account</h1>
                  <label className='form__label'>Email</label>
                  <input
                    className='form__input'
                    type='email'
                    name='email'
                    placeholder='Enter your email address'
                    onChange={onChange}
                  />
                  <label className='form__label'>Password</label>
                  <input
                    className='form__input'
                    type='password'
                    name='password'
                    placeholder="Password"
                    onChange={onChange}
                  />
                  <button className='form__button' type='submit'>
                    Continue
                  </button>
                  <Link
                    to='/register'
                    className='form__text'
                    onClick={() => dispatch(toggleModalSignIn())}
                  >
                    <div>Or create an account</div>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
