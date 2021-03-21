import pkg from 'graphql';
import bcrypt from 'bcryptjs';

import { UserType } from '../TypeDefs/Users.js';
import User from '../../Models/Users.js';

const { GraphQLID, GraphQLString } = pkg;

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    handle: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { name, handle, password } = args;

    console.log('00', name, handle, password);

    try {
      if (!name || !handle || !password) throw new Error('Missing field');

      const user = await User.findOne({ where: { handle } });
      console.log('11', user);

      if (user) {
        return 'Handle already taken.';
      } else {
        await User.create({
          name,
          handle,
          password: bcrypt.hashSync(password, 8),
        });

        return args;
      }
    } catch (err) {
      return { message: err };
    }
  },
};
