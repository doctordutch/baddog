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

  type Products {
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

  type Checkout {
    session: ID
  }

 type Auth {
      token: ID!
      user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    products(product: ID, productName: String): [Product]
    product(_id: ID!): Product
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout

  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      updateUser(username: String, email: String, password: String): User
      updateProduct(_id: ID!, quantity: Int!): Product
      addComment(commentBody: String!): Comment
      addOrder(products: [ID]!): Order
  }
`;

// export the typeDefs
module.exports = typeDefs;