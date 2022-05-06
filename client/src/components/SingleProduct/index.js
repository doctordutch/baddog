import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY} from '../../utils/actions'

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

    const { cart } = state;

    const addedProduct = () => {
        const itemAdded = cart.find((cartItem) => cartItem._id === _id);

        if(itemAdded) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemAdded.purchaseQuantity) + 1
            });

        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1}
            });
        }
    };
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
        <button onClick={addedProduct}>Add to cart</button>
        </div>
    );
}

export default SingleProduct;

