import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import Productlist from '../components/Productlist';

const Home = () => {
 
  //use useQuery hook to make a query request
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //use this to get to the product data
  const products = data?.products || [];
  console.log(products);

  return (
    <main>
      <div className='flex-row justify-space-between'>
      <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Productlist products={products} title="Beautiful woodcrafts for your home:"/>
          
          )}
          </div>
      </div>
    </main>
  );
};

export default Home;
