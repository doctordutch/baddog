import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function PurchasedHistory() {
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <>
        <div>
            <Link to="/">Back to Products</Link>

            {user ? (
                <>
                <h2>
                Purchased History for {user.username}
                </h2>
                {user.orders.map((order) => (
                    <div key={order._id} >
                        <h3>
                            {new Date(parseInt(order.purchaseDate)).toLocaleDateString}
                        </h3>
                    <div>
                        {order.products.map(({ _id, image, productName, price}, index) => (
                            <div key={index} >
                                <Link to={`/products/${_id}`}>
                                    <img alt={productName} src={`../../public/images/${image}`} />
                                    <p>{productName}</p>

                                </Link>
                                <div>
                                    <span>${price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             ))}
            </>
            ) : null}
         </div>
                  
    </>

    );
}

export default PurchasedHistory;