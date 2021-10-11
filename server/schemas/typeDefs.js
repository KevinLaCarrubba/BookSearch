const { gql } = require("apollp-server-express");

export const typeDefs = gql`
  type Book {
    _id: ID
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book]
  }
`;
