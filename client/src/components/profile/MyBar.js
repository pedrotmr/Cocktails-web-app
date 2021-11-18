import React, { useEffect, useState } from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import Carrousel from '../layouts/Carrousel';
import CarrouselDB from '../layouts/CarrouselDB';
import apiService from '../../APIService/cocktails-db-api';
import { useGetGinCocktailsQuery } from '../../APIService/cocktails-api';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/features/users/users.auth';

const MyBar = ({ navLinks }) => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const dispatch = useDispatch();
  const [usersDrinks, setUsersDrinks] = useState([]);
  const { data = [], isFetching } = useGetGinCocktailsQuery();

  const accessToken = localStorage.getItem('accessToken');
  const getProfile = async accessToken => {
    const userInfo = await apiService.loadUser(accessToken);
    if (userInfo) {
      dispatch(login());
    }
  };

  useEffect(() => {
    apiService.getAllUsersCocktails(setUsersDrinks);
    getProfile(accessToken);
  }, []);

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar scroll={'disable'} navLinks={navLinks} />
      <div className='section section'>
        <div className='section__cocktails'>
          <CarrouselDB list={usersDrinks} title={'What people are sharing'} />
          {/* That shoulb be liked video which i did not have time to implement */}
          {/* {!isFetching && <Carrousel list={data.drinks} title={'Drinks you liked'} />} */}
        </div>
      </div>
    </>
  );
};

export default MyBar;
