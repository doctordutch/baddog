import React from 'react';
import Cart from '../components/Cart';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <ProductList />
        <Cart />
      </div>
    </main>
  );
};

export default Home;
