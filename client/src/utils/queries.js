import { gql } from "@apollo/client";

export const GET_LOGGEDIN = gql`
  query login {
    login {
      _id
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
