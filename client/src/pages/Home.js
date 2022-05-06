import React from 'react';

import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <ProductList />
      </div>
    </main>
  );
};

export default Home;
