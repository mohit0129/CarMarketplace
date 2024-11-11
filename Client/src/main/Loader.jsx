import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
        <iframe
        src={`${process.env.PUBLIC_URL}/Loader.html`}  // Make sure the path is correct
        title="Local HTML Loader"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Loader;
