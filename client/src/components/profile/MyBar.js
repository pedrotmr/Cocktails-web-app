/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
import CarrouselDB from '../layouts/CarrouselDB';
import Carrousel from '../layouts/Carrousel';
import apiService from '../../APIService/cocktails-db-api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, login } from '../../redux/features/users/users.auth';
import { fetchCocktail } from '../../APIService/cocktails-api';
import { setUser } from '../../redux/features/users/currUser';

const MyBar = ({ navLinks }) => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const currUser = useSelector(state => state.currUser.user);
  const {trigger} = useSelector(state => state.userDrinks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allUsersDrinks, setAllUsersDrinks] = useState([]);
  const [myDrinks, setMyDrinks] = useState([]);
  const [favDrinks, setFavDrinks] = useState([]);

  async function checkAuth() {
    const accessToken = localStorage.getItem('accessToken');
    const user = await apiService.loadUser(accessToken);
    if (!user) {
      dispatch(logout());
      navigate('/');
      return
    } else {
      dispatch(login())
      !Object.keys(currUser).length && dispatch(setUser(user))
      getMyDrinks(accessToken);
      getAllUserDrinks();
      getFavDrinks();
    }
  }

  async function getFavDrinks() {
    if (currUser.savedDrinks) {
      const { savedDrinks } = currUser;
      let fullList = [];
      savedDrinks.forEach(async d => {
        const drink = await fetchCocktail(d);
        fullList.push(...drink.data.drinks)
        if (savedDrinks.length === fullList.length) setFavDrinks(fullList);
      })      
    }
  }

  async function getMyDrinks(accessToken) {
    await apiService.getAllMyCocktails(setMyDrinks, accessToken)
  }

  async function getAllUserDrinks () {
    await apiService.getAllUsersCocktails(setAllUsersDrinks);
  }

  useEffect(() => {
    checkAuth()
  }, []);

  useEffect(() => {
    getFavDrinks();
  }, [currUser])

  useEffect(() => {
    checkAuth();
    getAllUserDrinks();
  }, [trigger])

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar scroll={'disable'} navLinks={navLinks} />
      <div className='section section'>
        <div className='section__cocktails'>
          <CarrouselDB list={allUsersDrinks} title={'What people are sharing'} userDrinks ={false} />
          <CarrouselDB list = {myDrinks} title ={"My Created Drinks"} userDrinks ={true}/>
          <Carrousel list ={favDrinks} title = {"My Favorite Drinks"} userDrinks ={false}/>
          {/* That shoulb be liked video which i did not have time to implement */}
          {/* {!isFetching && <Carrousel list={data.drinks} title={'Drinks you liked'} />} */}
        </div>
      </div>
    </>
  );
};

export default MyBar;
