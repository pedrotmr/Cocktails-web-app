import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SpiritsGrid from './SpiritsGrid';
import Navbar from '../menu/Navbar';
import Sidebar from '../menu/Sidebar';

const SpiritPage = props => {
  const sideBarOpen = useSelector(state => state.sidebar.value);
  const [isOnTop, setIsOnTop] = useState(false);
  const navSpirits = ['Vodka', 'Gin', 'Rum', 'Whiskey', 'Tequila', 'Brandy'];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOnTop(true);
  });

  return (
    <>
      {sideBarOpen && <Sidebar navSpirits={navSpirits} />}
      <Navbar navSpirits={navSpirits} />
      {isOnTop && (
        <>
          {props.vodka && <SpiritsGrid title={'Vodka'} list={props.vodka.drinks} />}
          {props.gin && <SpiritsGrid title={'Gin'} list={props.gin.drinks} />}
          {props.tequila && <SpiritsGrid title={'Tequila'} list={props.tequila} />}
          {props.rum && <SpiritsGrid title={'Rum'} list={props.rum} />}
          {props.whiskey && <SpiritsGrid title={'Whiskey'} list={props.whiskey} />}
          {props.brandy && <SpiritsGrid title={'Brandy'} list={props.brandy} />}
        </>
      )}
    </>
  );
};

export default SpiritPage;
