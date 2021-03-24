import graphql from 'graphql';

import UserType from '../../TypeDefs/User.js';

const { GraphQLList, GraphQLID, GraphQLObjectType } = graphql;

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args, { User }) => {
    const users = await User.findAll();
    return users;
  },
};

export const GET_ONE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (parent, { id }, { User }) => {
    try {
      if (!id) throw new Error('Missing field');

      const user = User.findOne({ where: { id } });

      if (!user) {
        throw new Error('No user found with id');
      } else {
        return user;
      }
    } catch (err) {
      return { message: err };
    }
  },
};
