import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query products {
    products {
      _id
      productName
      createdAt
      quantity
      price
      image
      description
    
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query product($id: ID!) {
    product(_id: $id) {
      _id
      productName
      createdAt
      quantity
      price
      image description
      
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
     
      comments {
        _id
        commentBody
        createdAt
      }
    }
  }
`;