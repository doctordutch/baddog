import React, { useState } from 'react';
import { QUERY_COMMENTS, QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT} from '../../utils/mutations';

const CommentBox = () => {
    const [commentBody, setText ] = useState('');
    const [ wordCount, setwordCount ] = useState(0);

    const [addComment, {error}] = useMutation(ADD_COMMENT, {
        update(cache, {data: {addComment} }) {
            try{
                const { comments } = cache.readQuery({ query: QUERY_COMMENTS});
                cache.writeQuery({
                    query: QUERY_COMMENTS,
                    data: { thoughts: [addComment, ...comments]},
                });
            } catch (e) {
                console.error(e);
            }
        const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, comments: [...me.comments, addComment ]}},
        
        });
    },
});
    const handleChange = (event) => {
        if(event.target.value.length <=500) {
            setText(event.target.value);
            setwordCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({
                variables:  {commentBody},
            });

            setText('');
            setwordCount(0);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            <p
            className={`character ${wordCount === 500 || error ? 'text-error' : ''}`}
            >
                Word Count: {wordCount}/500
                {error && <p>An error occured...</p>}
            </p>
            <form 
            className="flex-row"
            onSubmit={handleFormSubmit}
            >
            <textarea 
                placeholder='New Review...'
                value={commentBody}
                className="text"
                onChange={handleChange}
                >

                </textarea>
            <button className='btn' type="submit">
                Submit
            </button>
            </form>
        </div>
    )
};

export default CommentBox;