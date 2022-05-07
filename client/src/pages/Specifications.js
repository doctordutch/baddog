import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { QUERY_PRODUCTS, QUERY_COMMENTS } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { Link, useParams } from 'react-router-dom';
import { idbPromise } from '../utils/helpers';
import Cart from '../components/Cart';
import CommentBox from '../components/CommentBox';
import CommentList from '../components/CommentList';

import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
} from '../utils/actions';


function Specifications() {
    const { loading, data} = useQuery(QUERY_COMMENTS, QUERY_PRODUCTS);
    const comments = data?.comments || [];
    console.log(comments);
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { products, cart } = state;

    useEffect(() => {
        if(products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
        
        } else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });

        data.products.forEach((product) => {
            idbPromise('products', 'put', product);
        });
        }
        else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: indexedProducts,
                });
            });
        }
    }, [products, data, loading, dispatch, id]);

    const addedProduct = () => {
        const itemAdded = cart.find((cartItem) => cartItem._id === id);

        if(itemAdded) {
           dispatch({
               type: UPDATE_CART_QUANTITY,
               _id: id,
               purchaseQuantity: parseInt(itemAdded.purchaseQuantity) + 1

        });

    idbPromise('cart', 'put', {
        ...itemAdded,
        purchaseQuantity: parseInt(itemAdded.purchaseQuantity) + 1
    });
    } else {
        dispatch({
            type: ADD_TO_CART,
            product: { ...currentProduct, purchaseQuantity: 1 }
        });

    idbPromise('cart', 'put', {...currentProduct, purchaseQuantity: 1});
    };
};

    const itemDeleted = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentProduct._id
        });
        idbPromise('cart', 'delete', {...currentProduct});
};

    return (
        <>
            {currentProduct  && cart ?  (
                <div>
                    <Link to='/'>Go back to Products</Link>
                    <h2>{currentProduct.productName}</h2>
                    <p>{currentProduct.description}</p>
                    <p>
                        <strong>Price:</strong>${currentProduct.price}{' '}

                        <button onClick={addedProduct}>Add to Cart</button>
                    <button 
                            disabled={!cart.find((p) => p._id === currentProduct._id)}
                            onClick={itemDeleted}
                            >
                            Remove from Cart
                    </button>
                    </p>
                    <img 
                        src={`/images/${currentProduct.image}`}
                        alt={currentProduct.productName}
                    />
                    <CommentBox />
                    <CommentList comments={comments} title="Reviews..." />

                </div>
                ) : null}
            <Cart />
        </>
    );
}

export default Specifications;