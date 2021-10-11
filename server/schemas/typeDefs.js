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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    login: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(
      authors: [String]
      Description: String!
      title: String!
      bookid: String
      image: String
      link: String
    ): User
    removeBook(bookId: String!): User
  }
`;
