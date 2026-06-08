import React from 'react';
import '../../styles/Common.css';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="spinner"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
