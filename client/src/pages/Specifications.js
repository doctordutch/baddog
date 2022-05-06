import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { QUERY_PRODUCTS } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import { Link, useParams } from 'react-router-dom';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';


function Specifications() {
    const [state, dispatch] = useStoreContext();
    const {id} = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { data } = useQuery(QUERY_PRODUCTS);
    const {products} = state;

    useEffect(() => {
        if(products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
        } else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
        }
    }, [products, data, dispatch, id]);

    return (
        <>
            {currentProduct ? (
                <div>
                    <Link to='/'>Go back to Products</Link>
                    <h2>{currentProduct.productName}</h2>
                    <p>{currentProduct.description}</p>
                    <p>
                        <p>Price:</p>${currentProduct.price}{' '}

                        <button>Add to Cart</button>
                            <button>Remove from Cart</button>
                    </p>
                    <img 
                        src={`/images/${currentProduct.image}`}
                        alt={currentProduct.productName}
                    />
                </div>
                ) : null}
        </>
    );
}

export default Specifications;