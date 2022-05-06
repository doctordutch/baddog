import React from 'react';
import Added from '../Added';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART } from '../../utils/actions';
import './styles.css'

const Cart = () => {
    const [ state, dispatch ] = useStoreContext();

    function toggleCart() {
        dispatch({ type: TOGGLE_CART })
    }

    if (!state.cartOpen) {
        return (
            <div className="closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        );
    }

    function AmountDue() {
        let sum = 0;
        state.cart.forEach(item => {
            sum +=item.price * item.purchaseQuantity;
        });

        return sum.toFixed(2);
    }

    return (
        <div className='Cart'>
            <div className='close' onClick={toggleCart}>[close]</div>
            <h2>Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <Added key={item._id} item={item} />
                    
            ))}
            <div>
                <strong>Total: ${AmountDue()}</strong>
                {
                    Auth.loggedIn() ?
                    <button>
                        Checkout
                    </button>
                    :
                    <span>(Login is required to checkout)</span>
                }
            </div>
            </div>
            ) : (
                <h4>
                    Cart is empty!
                </h4>
            )}
           
        </div>
    );
};

export default Cart;
