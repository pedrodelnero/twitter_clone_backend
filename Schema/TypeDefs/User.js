import graphqlTypes from 'graphql';

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphqlTypes;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    handle: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export default UserType;
