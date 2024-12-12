import React from 'react';
import './Loader.css';
// import logo from "../../../public/F.png"
const Loader = () => {
    // console.log('Loading is doing in loader');
  return (
    <div className="loader-container flex flex-col  ">
      <img src={'F.png'} alt="" />
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
