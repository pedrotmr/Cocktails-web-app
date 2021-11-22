/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import CarrouselDB from '../layouts/CarrouselDB';
import apiService from '../../APIService/cocktails-db-api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/users/users.auth';

const MyBar = ({ navLinks }) => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsersDrinks, setAllUsersDrinks] = useState([]);
  const [myDrinks, setMyDrinks] = useState([]);

  useEffect(() => {
    async function checkAuth() {
      const accessToken = localStorage.getItem('accessToken');
      const notAuth = await apiService.getAllMyCocktails(setMyDrinks, accessToken);
      if (notAuth) {
        dispatch(logout());
        navigate('/');
        return
      }
    }
    checkAuth()
    apiService.getAllUsersCocktails(setAllUsersDrinks);
  }, []);

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar scroll={'disable'} navLinks={navLinks} />
      <div className='section section'>
        <div className='section__cocktails'>
          <CarrouselDB list={allUsersDrinks} title={'What people are sharing'} userDrinks ={false} />
          <CarrouselDB list = {myDrinks} title ={"My Created Drinks"} userDrinks ={true}/>
          <CarrouselDB list ={allUsersDrinks} title = {"My Favorite Drinks"} userDrinks ={false}/>
          {/* That shoulb be liked video which i did not have time to implement */}
          {/* {!isFetching && <Carrousel list={data.drinks} title={'Drinks you liked'} />} */}
        </div>
      </div>
    </>
  );
};

export default MyBar;
