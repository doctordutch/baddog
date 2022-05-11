
// import React from 'react';
import { Link } from 'react-router-dom';
//import SingleProduct from '../../pages/SingleProduct';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import CommentList from '../CommentList';
import SingleProduct from '../SingleProduct';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';

import {idbPromise} from '../../utils/helpers';

function Productlist() {
    const [state, dispatch] = useStoreContext();

    const {currentProducts} = state;

    const {  loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
              });
        } else if (!loading)  {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                type: UPDATE_PRODUCTS,
                products: products,
            });
        });
    }
    }, [data, loading, dispatch]);

    function Products() {
        if(!currentProducts) {
            return state.products;
        }
        
        return state.products.filter(
            (product) => product.products_id === currentProducts
        );
    }

    return (
        <div>
            <h2> Products:</h2>
            {state.products.length ? (
                <div className='row'>
                    <div className='column'>
                    {Products().map((product) => (
                    <SingleProduct
                    key={product._id}
                    _id={product._id}
                    image={product.image} className ='photo'
                    productName={product.productName}
                    price={product.price}
                    quantity={product.quantity}
                    description={product.description}
                    createdAt={product.createdAt}

                    />
              
            ))}
            </div>
        </div>
    ) : (
        <h3> No products have been added!</h3>
    )}
    </div>
    );
}

export default Productlist;