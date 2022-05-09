import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
{
  products {
    _id
    productName 
    quantity
    price
    image
    description
  
  }
}
`;

export const QUERY_USER = gql`
 {
  user {
    _id
    username
    email
    comments {
      _id
      commentBody
      createdAt
    orders {
      _id
      purchaseDate
    products {
      _id
     productName
      quantity
      createdAt
      image
      description
      price
    }
    }
    }
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

export const QUERY_COMMENTS = gql`
  query comments($username: String) {
    comments(username: $username) {
      _id
      commentBody
      createdAt
      username
    
      
    }
  }

`
;

export const QUERY_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id) {
      _id
      commentBody
      createdAt
      username

    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
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
