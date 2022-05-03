import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import Thoughtlist from '../components/Thoughtlist';

const Home = () => {
  //use useQuery hook to make a query request
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //use this to get to the thought data
  const products = data?.products || [];
  console.log(products);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        
      </div>
    </main>
  );
};

export default Home;
