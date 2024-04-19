import React from 'react';
import image from '../../assets/image.jpg';
import './Welcome.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="content">
          <h1>Welcome</h1>
          <br></br>
          <h3>Twitter Landing Page By Ronak Thesiya</h3>
          <h6>Task from Claw</h6>
          <br/>
          <Link to="/login" style={{textDecoration: 'none',color: 'white'}}>Click Me ! </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
