// import apolloServerPkg from 'apollo-server-express';

// const { gql } = apolloServerPkg;

// const typeDefs = gql`
//   type User {
//     id: ID!
//     name: String!
//     handle: String!
//     password: String!
//   }

//   type Post {
//     id: ID!
//     text: String
//     ownerId: ID!
//   }

//   type ReturnUserObject {
//     name: String
//     handle: String
//   }

//   # Queries
//   type Query {
//     getAllUsers: [User!]!
//     getOneUser(id: ID!): ReturnUserObject
//   }

//   # Mutations
//   type Mutation {
//     createUser(name: String!, handle: String!, password: String): User
//   }
// `;

// export default typeDefs;

export { default as postTypeDef } from './Post.js';
export { default as userTypeDef } from './User.js';
