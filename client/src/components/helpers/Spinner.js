import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '100px',
        margin: 'auto',
        display: 'flex',
      }}
    />
  </>
);

export default Spinner;
