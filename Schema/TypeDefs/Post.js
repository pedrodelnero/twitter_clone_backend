import graphqlTypes from 'graphql';

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphqlTypes;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    ownerId: { type: GraphQLID },
  }),
});

export default PostType;
