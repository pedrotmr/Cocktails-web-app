import React, { useEffect } from 'react';
import SpiritsGrid from './SpiritsGrid';

const SpiritList = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='spirits__hero'>
        <div className={props.title}></div>
      </div>
      {props.vodka && <SpiritsGrid title={'Vodka'} list={props.vodka} />}
      {props.gin && <SpiritsGrid title={'Gin'} list={props.gin} />}
      {props.tequila && <SpiritsGrid title={'Tequila'} list={props.tequila} />}
      {props.rum && <SpiritsGrid title={'Rum'} list={props.rum} />}
      {props.whiskey && <SpiritsGrid title={'Whiskey'} list={props.whiskey} />}
      {props.brandy && <SpiritsGrid title={'Brandy'} list={props.brandy} />}
    </>
  );
};

export default SpiritList;
