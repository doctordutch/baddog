import React from 'react';
import { Link } from 'react-router-dom';
import BadDog from '../../images/Bad Dog logo.jpg';


const Header = () => {
  return (
    <header >
      <div >
        <Link to="/">
        <h1>Bad Dog Woodshop</h1>
        <img src={BadDog} alt="Bad Dog logo" width="20%"/>
        <h3>Clarkston, MI</h3>
        </Link>

        <nav className='text-center'>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup!</Link>
          <Link to="/quote">Get a Quote!</Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;
