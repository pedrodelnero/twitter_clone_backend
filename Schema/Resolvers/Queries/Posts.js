import graphql from 'graphql';

import PostType from '../../TypeDefs/Post.js';

const { GraphQLList, GraphQLID, GraphQLObjectType } = graphql;

export const GET_ALL_POSTS = {
  type: new GraphQLList(PostType),
  resolve: async (parent, args, { Post }) => {
    const posts = await Post.findAll();
    return posts;
  },
};

export const GET_POSTS_BY_USER = {
  type: PostType,
  args: {
    ownerId: { type: GraphQLID },
  },
  resolve: async (parent, { ownerId }, { User }) => {
    try {
      if (!id) throw new Error('Missing field');

      const posts = Post.findAll({ where: { ownerId } });

      if (!user) {
        throw new Error('No posts found with ownerId');
      } else {
        return posts;
      }
    } catch (err) {
      return { message: err };
    }
  },
};
