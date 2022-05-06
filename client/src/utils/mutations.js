import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
    `;

export const ADD_USER = gql`
    mutation addUser(
        $email: String!
        $password: String!
        $username: String!
    ) {
        addUser(
            email: $email
            password: $password
            username: $username
        ) {
            token
            user {
                _id
            }
        }
    }
    `;

export const ADD_ORDER = gql`
    mutation addOrder($products: [ID]!) {
        addOrder(products: $products) {
            purchaseDate
            products {
                _id
                productName
                description
                price 
                image
                quantity
                createdAt
                comments {
                    commentBody
                }
            }
        }
    }
    `;