import React, { useEffect, useState } from 'react';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';
// import Carrousel from '../layouts/Carrousel';
import CarrouselDB from '../layouts/CarrouselDB';
import apiService from '../../APIService/cocktails-db-api';
// import { useGetGinCocktailsQuery } from '../../APIService/cocktails-api';
import { useSelector, useDispatch } from 'react-redux';
// import { login } from '../../redux/features/users/users.auth';

const MyBar = ({ navLinks }) => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  // const dispatch = useDispatch();
  const [allUsersDrinks, setAllUsersDrinks] = useState([]);
  const [myDrinks, setMyDrinks] = useState([]);

  // +delete?: not sure why making this general API call
  // const { data = [], isFetching } = useGetGinCocktailsQuery();

  // +fix: do we need this? call to isAuthenticated action to get userAuth status
  // const accessToken = localStorage.getItem('accessToken');
  // const getProfile = async accessToken => {
  //   const userInfo = await apiService.loadUser(accessToken);
  //   if (userInfo) {
  //     dispatch(login());
  //   }
  // };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    apiService.getAllUsersCocktails(setAllUsersDrinks);
    apiService.getAllMyCocktails(setMyDrinks, accessToken)
    // + delete? not sure what this is doing
    // getProfile(accessToken);
  }, []);

  return (
    <>
      {sideBarOpen && <Sidebar navLinks={navLinks} />}
      <Navbar scroll={'disable'} navLinks={navLinks} />
      <div className='section section'>
        <div className='section__cocktails'>
          {/* +fix: get normal carousel working and use here */}
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
