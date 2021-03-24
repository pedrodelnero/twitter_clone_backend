import graphql from 'graphql';

import { GET_ALL_USERS, GET_ONE_USER } from './Resolvers/Queries/Users.js';
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from './Resolvers/Mutations/Users.js';
import { CREATE_POST, DELETE_POST } from './Resolvers/Mutations/Posts.js';
import { GET_ALL_POSTS, GET_POSTS_BY_USER } from './Resolvers/Queries/Posts.js';

const { GraphQLObjectType, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
    getOneUser: GET_ONE_USER,
    getAllPosts: GET_ALL_POSTS,
    getAllPostsByUser: GET_POSTS_BY_USER,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
    createPost: CREATE_POST,
    deletePost: DELETE_POST,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
