import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../utils/queries';
import CommentList from '../components/CommentList';
//import Comment from '../components/Comment.js';

const SingleProduct = props => {
  const { id: productId } = useParams();
  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { id: productId }
  });
  const product = data?.product || {};
  if (loading) {
    return <div>Loading, just a sec!</div>;
  }
  console.log(productId);
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {product}
          </span>{' '}
          Product on {product.createdAt}
        </p>
        <div className="card-body">
          <p>{product.description}</p>
        </div>
      </div>
      {product.commentCount > 0 && <CommentList comments={product.comments}/>}
    </div>
  );
};

export default SingleProduct;
