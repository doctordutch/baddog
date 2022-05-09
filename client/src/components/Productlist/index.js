import React from 'react';
import { Link } from 'react-router-dom';
//import SingleProduct from '../../pages/SingleProduct';


const Productlist = ({ products, title }) => {


  return (
    <div>
      <h3>{title}</h3>
      {products &&
        products.map(product => (
          <div key={product._id} className="card mb-3">
            <p className="card-header">
              <Link to={`/product/${product.productName}`}
                style={{ fontWeight: 700 }}
                className="text-light">
                  {product.productName}
                  </Link>{''}
    
            </p>
            <div className="card-body">
              <Link to={`/product/$product._id}`}>
               <p>Price: {product.price}</p>
               <p># available: {product.quantity}</p>
               <p>{product.description}</p>
               <p>{product.image}</p>
              </Link>                   
               
            </div>
            </div>
        ))}
    </div>
    );
        };
        

export default Productlist;

