/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import CarrouselDB from '../layouts/CarrouselDB';
import Carrousel from '../layouts/Carrousel';
import apiService from '../../APIService/cocktails-db-api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/users/users.auth';
import { fetchCocktail } from '../../APIService/cocktails-api';

const MyBar = ({ navLinks }) => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const currUser = useSelector(state => state.currUser.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsersDrinks, setAllUsersDrinks] = useState([]);
  const [myDrinks, setMyDrinks] = useState([]);
  const [favDrinks, setFavDrinks] = useState([]);

  useEffect(() => {
    async function checkAuth() {
      const accessToken = localStorage.getItem('accessToken');
      const isAuth = await apiService.getAllMyCocktails(setMyDrinks, accessToken);
      if (!isAuth) {
        dispatch(logout());
        navigate('/');
        return
      }
    }
    checkAuth()
    apiService.getAllUsersCocktails(setAllUsersDrinks);
    if (currUser.savedDrinks) {
      const { savedDrinks } = currUser;
      let fullList = [];
      savedDrinks.forEach(async d => {
        const drink = await fetchCocktail(d);
        fullList.push(...drink.data.drinks)
        if (savedDrinks.length === fullList.length) setFavDrinks(fullList);
      })      
    }
  }, []);

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar scroll={'disable'} navLinks={navLinks} />
      <div className='section section'>
        <div className='section__cocktails'>
          <CarrouselDB list={allUsersDrinks} title={'What people are sharing'} userDrinks ={false} />
          <CarrouselDB list = {myDrinks} title ={"My Created Drinks"} userDrinks ={true}/>
          {/* That shoulb be liked video which i did not have time to implement */}
          {/* {!isFetching && <Carrousel list={data.drinks} title={'Drinks you liked'} />} */}
        </div>
          <Carrousel list ={favDrinks} title = {"My Favorite Drinks"} userDrinks ={false}/>
      </div>
    </>
  );
};

export default MyBar;
