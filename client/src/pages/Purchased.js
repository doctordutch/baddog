import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';

function Purchased () {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
        }
        saveOrder();
    }, [addOrder]);

    return (
        <div>
            <Jumbotron>
                <h1>Purchased!</h1>
                <h2>Thank you for purchasing with us!</h2>
                <h2>You will be redirected to our main page! </h2>
            </Jumbotron>
        </div>
    )

}

export default Purchased;