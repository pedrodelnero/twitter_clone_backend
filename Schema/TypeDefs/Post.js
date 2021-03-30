import apolloServerPkg from 'apollo-server-express';

const { gql } = apolloServerPkg;

export default gql`
  type Post {
    id: ID!
    text: String
    ownerId: ID!
  }

  type DeletePostMessage {
    message: String
  }

  # Queries
  extend type Query {
    getAllPosts: [Post!]!
    getOnePost(id: ID!): Post!
  }

  # Mutations
  extend type Mutation {
    createPost(id: ID!, text: String!): Post
    deletePost(id: ID!): DeletePostMessage
  }
`;
