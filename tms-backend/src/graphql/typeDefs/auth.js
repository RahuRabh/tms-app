const gql = require("graphql-tag");

module.exports = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String
    email: String
    role: String
  }

  type Mutation {
    register(name: String!, email: String!, role: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;
