import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../utils/queries';
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
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
          thought on {product.createdAt}
        </p>
        <div className="card-body">
          <p>{product.description}</p>
        </div>
      </div>
      {product.commentCount > 0 && <ReactionList comments={product.comments}/>}
    </div>
  );
};

export default SingleThought;
