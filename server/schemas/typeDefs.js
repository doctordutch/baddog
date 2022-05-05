// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

  type Product {
    _id: ID
    productName: String
    createdAt: String
    description: String
    price: Float
    image: String
    quantity: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    comments: [Comment]
    orders: [Order]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }


  type Query {
    me: User
    users: [User]
    user(username: String!): User
    products(product: ID, productName: String): [Product]
    product(_id: ID!): Product
    comments: [Comment]
    comment(_id: ID!): Comment
    order(_id: ID!): Order

  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      updateUser(username: String, email: String, password: String): User
      updateProduct(_id: ID!, quantity: Int!): Product
      addComment(commentId: ID!): Comment
      addOrder(products: [ID]!): Order
  }

  type Auth {
      token: ID!
      user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;