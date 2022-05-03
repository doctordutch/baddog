import React from 'react';
import { Link } from 'react-router-dom';

const Productlist = ({ products, title }) => {
  // if (!thoughts.length) {
  //   return <h3>No Thoughts Yet</h3>;
  // }

  return (
    <div>
      <h3>{title}</h3>
      {products &&
        products.map(product => (
          <div key={product._id} className="card mb-3">
            <p className="card-header">
              <Link to={`/profile/${product}`}
              style={{ fontWeight: 700 }}
              className="text-light">
                {product}
                </Link>{' '}
                thought on {product.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/product/${product._id}`}>
              <p>{product.description}</p>
              <p className="mb-0">
                Comments: {product.commentCount} || Click to{' '}
                {product.commentCount ? 'see' : 'start'} share your thoughts!
              </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Productlist;