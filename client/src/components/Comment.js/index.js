import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../CommentList';

import { useQuery } from '@apollo/client';
import { QUERY_COMMENT } from '../../utils/queries';

const Comment = (props) => {
    const { id: commentId } = useParams();

    const { loading, data } = useQuery(QUERY_COMMENT, {
        variables: { id: commentId },
    });
    const comment = data?.comment || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className='card-header'>
                <p>
                {comment.username}
                </p>{' '}
             { comment.createdAt} {comment.commentBody}
            </div>
            
        </div>
    );
};

export default Comment;