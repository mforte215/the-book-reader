const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }


type Book {
  authors: [String]
  description: String
  bookId: String
  image: String
  link: String
  title: String
}

  type Query {
    users: [User]
    user(username: String!): User
  }


`;

module.exports = typeDefs;
