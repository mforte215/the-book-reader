import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
      password
      username
    }
    token
  }
}
`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      username
      email
      password
    }
    token
  }
}
`;

export const SAVE_BOOK = gql`
mutation Mutation($authors: [String], $description: String, $title: String, $bookId: String, $image: String, $link: String) {
  saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    token
  }
}
`;


