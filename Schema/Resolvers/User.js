const userResolvers = {
  Query: {
    getAllUsers(parent, args, { User }) {
      const users = User.findAll();
      return users;
    },
    async getOneUser(parent, { id }, { User }) {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new Error('No user found with id.');
      } else {
        return {
          id: user.dataValues.id,
          name: user.dataValues.name,
          handle: user.dataValues.handle,
        };
      }
    },
  },
  Mutation: {
    async createUser(
      parent,
      { userInfo: { name, handle, password } },
      { User }
    ) {
      console.log('START');
      const user = await User.findOne({ where: { handle } });

      console.log('0000', user);

      if (user) {
        throw new Error('Handle already taken');
      } else {
        const newUser = await User.create({ name, handle, password });
        console.log('0011', newUser);
        return {
          id: newUser.dataValues.id,
          handle: newUser.dataValues.handle,
          name: newUser.dataValues.name,
        };
      }
    },
    async deleteUser(parent, { id }, { User, Post }) {
      if (!id) throw new Error('Missing field');

      const user = await User.findOne({ where: { id } });
      console.log(user);

      if (!user) {
        throw new Error('No user with id');
      } else {
        await Post.destroy({ where: { ownerId: id } });
        await User.destroy({ where: { id } });

        return { message: 'User deleted.' };
      }
    },
  },
};

export default userResolvers;
