import graphql from 'graphql';

import { UserType } from '../TypeDefs/Users.js';
import User from '../../Models/Users.js';

const { GraphQLList } = graphql;

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    const users = User.findAll();
    return users;
  },
};
