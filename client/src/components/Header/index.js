import React from 'react';
import { Link } from 'react-router-dom';
import BadDog from '../../images/Bad Dog logo.jpg';

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
        <h1>Bad Dog Woodshop</h1>
        <img src={BadDog} alt="Bad Dog logo" width="20%"/>
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
