import apolloServerPkg from 'apollo-server-express';

const { gql } = apolloServerPkg;

export default gql`
  type User {
    id: ID!
    name: String!
    handle: String!
  }

  type DeleteUserMessage {
    message: String
  }

  input UserInfo {
    name: String!
    handle: String!
    password: String!
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
    getOneUser(id: ID!): User!
  }

  # Mutations
  type Mutation {
    createUser(userInfo: UserInfo!): User!
    deleteUser(id: ID!): DeleteUserMessage
  }
`;
