import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../menu/Navbar';
import Alerts from '../helpers/Alerts';
import apiService from '../../APIService/cocktails-db-api';
import { login } from '../../redux/features/users/users.auth';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(null);

  const setAlertMsg = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // +add: form validation for each field
    if (password !== password2) return setAlertMsg('Passwords do no match', 'danger');
    const newUser = { name, email, password };
    const res = await apiService.register(newUser);
    if (res.error) {
      setAlertMsg(res.message, 'danger');
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      dispatch(login());
      navigate('/');
    }
  };

  return (
    <>
      <Navbar black={'color'} register={'hide sign in'} />
      <div className='form--register'>
        <div className='form__wrapper'>
          <div className='form__content'>
            <form
              action=''
              className='form__form form__form--register'
              onSubmit={onSubmit}
            >
              <Alerts alert={alert} />
              <h1 className='form__header'> Account Register</h1>
              <label className='form__label'>Name</label>
              <input
                className='form__input'
                name='name'
                type='name'
                value={name}
                onChange={onChange}
                required
              />
              <label className='form__label'>Email</label>
              <input
                className='form__input'
                name='email'
                type='email'
                value={email}
                onChange={onChange}
                required
              />
              <label className='form__label'>Password</label>
              <input
                className='form__input'
                name='password'
                type='password'
                value={password}
                onChange={onChange}
                required
              />
              <label className='form__label'>Confirm Password</label>
              <input
                className='form__input'
                name='password2'
                type='password'
                value={password2}
                onChange={onChange}
                required
              />
              <input className='form__button' type='submit' value='Register' />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
