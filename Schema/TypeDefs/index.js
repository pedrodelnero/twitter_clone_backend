import apolloServerPkg from 'apollo-server-express';

const { gql } = apolloServerPkg;

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    handle: String!
    posts: [Post]
    likes: [Like]
  }

  type UserFollower {
    id: ID!
    followerId: String!
    followedId: String!
    followed: User!
    follower: User!
  }

  type Post {
    id: ID!
    text: String
    ownerId: ID!
    user: User!
    likes: [Like]
  }

  type Like {
    id: ID!
    postId: ID!
    userId: ID!
    user: User!
    post: Post!
  }

  type DeleteMessage {
    message: String
  }

  # NEW ONES:
  type ErrorMessage {
    message: String
  }

  type GetOneUserData {
    id: ID!
    handle: String!
    name: String!
  }

  type GetOneUserResponse {
    success: Boolean!
    user: User
    message: String
  }
  type isAuthResponse {
    success: Boolean!
    user: User
    message: String
  }

  type getPostsForFollower {
    success: Boolean!
    message: String
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
    getOneUser: GetOneUserResponse!
    isAuth: isAuthResponse!

    posts: [Post]
    getOnePost(id: ID!): Post!
    postsByUser: [Post]
    postsForFollower(ownerId: ID!): getPostsForFollower

    getLikesByPost(postId: ID!): [Like!]!
    getLikesByUser: [Like]

    userFollowers(followedId: ID!): [UserFollower]
    userFollowersAndFollowed: [UserFollower]
  }

  type LoginUserResponse {
    success: Boolean!
    message: String
    user: User
    token: String
  }

  # Mutations
  type Mutation {
    createUser(
      name: String!
      handle: String!
      password: String!
      confirmPassword: String!
    ): User!
    deleteUser(id: ID!): DeleteMessage
    loginUser(handle: String!, password: String!): LoginUserResponse!

    createPost(text: String!): Post
    deletePost(id: ID!): DeleteMessage

    createLike(postId: ID!): Like!
    deleteLike(postId: ID!): DeleteMessage

    # change message
    followUser(followedId: ID!): UserFollower
    unfollowUser(followedId: ID!): DeleteMessage
  }
`;

export default typeDefs;
