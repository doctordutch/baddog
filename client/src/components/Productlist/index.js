import React from 'react';
import { Link } from 'react-router-dom';
import SingleProduct from '../../pages/SingleProduct';

const Productlist = ({ products, title }) => {


  return (
    <div>
      <h3>{title}</h3>
      {products &&
        products.map(product => (
          <div key={product._id} className="card mb-3">
            <p className="card-header">
              
              <img src='../../images/${product.image}'/>
            
               </p>
            
          </div>
        ))}
    </div>
    );
        };
        

export default Productlist;

