import graphql from 'graphql';
import { GET_ALL_USERS } from './Queries/Users.js';

const { GraphQLObjectType, GraphQLSchema } = graphql;
import { CREATE_USER } from './Mutations/Users.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
