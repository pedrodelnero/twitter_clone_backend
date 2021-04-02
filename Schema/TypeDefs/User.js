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

  # Queries
  type Query {
    getAllUsers: [User!]!
    getOneUser(id: ID!): User!
  }

  # Mutations
  type Mutation {
    createUser(name: String!, handle: String!, password: String!): User!
    deleteUser(id: ID!): DeleteUserMessage
    loginUser(handle: String!, password: String!): User
  }
`;
