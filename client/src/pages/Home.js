import React from 'react';
import Cart from '../components/Cart';
import Productlist from '../components/Productlist';

const Home = () => {
  return (
    <main>
      <div className='row'>
        <Productlist />
        <Cart />
      </div>
    </main>
  );
};

export default Home;
