import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from "../../utils/GlobalState";

function SingleProduct(item) {
    const [state, dispatch] = useStoreContext();
    const {
        _id,
        image, 
        productName,
        quantity,
        createdAt,
        description,
        price
        
    } = item;

    return (
        <div>
            <Link to={`/products/${_id}`}>
                <img
                    alt={productName}
                    src={`/images/${image}`}
                    />
                    <p>{productName}</p>
            </Link>
        <div>
            <div>{quantity} {('item', quantity)} in Stock</div>
            <span>${price}</span>
            <p>{description} {createdAt}</p>
        </div>
        <button>Add to cart</button>
        </div>
    );
}

export default SingleProduct;

