import pkg from 'graphql';

import PostType from '../../TypeDefs/Post.js';

const { GraphQLID, GraphQLString } = pkg;

export const CREATE_POST = {
  type: PostType,
  args: {
    text: { type: GraphQLString },
    ownerId: { type: GraphQLID },
  },
  resolve: async (parent, { text, ownerId }, { Post }) => {
    try {
      const post = await Post.create({
        text,
        ownerId,
      });

      return post;
    } catch (err) {
      console.log('ERR create post', err.message);
      return { message: err.message };
    }
  },
};

export const DELETE_POST = {
  type: PostType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }, { Post }) => {
    console.log('99', id);
    try {
      if (!id) throw new Error('Missing field');

      const post = await Post.findOne({ where: { id } });

      console.log('00', post);

      if (!post) {
        throw new Error('No post with id');
      } else {
        await Post.destroy({ where: { id } });

        return post;
      }
    } catch (err) {
      console.log('ERR delete post', err.message);
      return { message: err.message };
    }
  },
};
