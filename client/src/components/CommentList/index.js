import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments, title }) => {
    if (!comments.length) {
        return <h3>No Reviews Yet</h3>
    }
  return (
      <div>
            <h3>{title}</h3>
            {comments &&
            comments.map(comment => (
                <div key={comment._id}>
                <p className='card-header'>
                
                <Link to={`/comment/${comment.username}`} 
                    style={{ fontWeight: 700 }}
                    >               
                {comment.username}
                </Link>{' '}
                review on {comment.createdAt}
                </p>
                <div>
                <Link to={`/comment/${comments._id}`}>
                    <p>{comment.commentBody}</p>
              </Link>
            </div>
            </div>
         ))}
         </div>
  );
};

export default CommentList;
