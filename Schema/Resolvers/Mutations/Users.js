import pkg from 'graphql';
import bcrypt from 'bcryptjs';

import UserType from '../../TypeDefs/User.js';

const { GraphQLID, GraphQLString } = pkg;

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    handle: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args, { User }) => {
    const { name, handle, password } = args;

    try {
      if (!name || !handle || !password) throw new Error('Missing field');

      const user = await User.findOne({ where: { handle } });

      if (user) {
        throw new Error('Handle not available');
      } else {
        await User.create({
          name,
          handle,
          password: bcrypt.hashSync(password, 8),
        });

        return { name, handle };
      }
    } catch (err) {
      console.log('ERR create user', err.message);
      return { message: err.message };
    }
  },
};

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args, { User }) => {
    const { id } = args;

    try {
      if (!id) throw new Error('Missing field');

      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new Error('No user with id');
      } else {
        await User.destroy({ where: { id } });

        return user;
      }
    } catch (err) {
      console.log('ERR delete user', err.message);
      return { message: err.message };
    }
  },
};

export const UPDATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    handle: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, { name, handle, password }, { User }) => {
    try {
      if (!id) throw new Error('Missing id');

      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new Error('No user with id');
      } else {
        if (name !== user.name) await user.update({ name: name });
        if (handle !== user.handle) await user.update({ handle: handle });
        // if (newPassword !== user.password) await user.update({ name: newPassword });

        return user;
      }
    } catch (err) {
      console.log('ERR update user', err.message);
      return { message: err.message };
    }
  },
};
