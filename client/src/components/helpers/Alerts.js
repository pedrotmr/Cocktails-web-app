import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <FiAlertCircle /> {alert.message}
      </div>
    )
  );
};

export default Alert;
