import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userResolvers = {
  Query: {
    getAllUsers: async (parent, args, { User }) => {
      console.log('getalluser START');
      const users = await User.findAll();
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
    createUser: async (parent, { name, handle, password }, { User }) => {
      const user = await User.findOne({ where: { handle } });

      if (user) {
        throw new Error('Handle already taken');
      } else {
        const newUser = await User.create({
          name,
          handle,
          password: bcrypt.hashSync(password, 8),
        });
        return {
          id: newUser.dataValues.id,
          handle: newUser.dataValues.handle,
          name: newUser.dataValues.name,
        };
      }
    },
    deleteUser: async (parent, { id }, { User, Post }) => {
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
    loginUser: async (parent, { handle, password }, { User, res }) => {
      if (!handle || !password) throw new Error('Missing field');

      const user = await User.findOne({ where: { handle } });

      if (!user) {
        throw new Error('No user with handle');
      } else {
        const isMatch = await bcrypt.compare(
          password,
          user.dataValues.password
        );

        if (!isMatch) {
          throw new Error('Wrong password');
        } else {
          const token = jwt.sign(
            { id: user.dataValues.id.toString() },
            process.env.JWT_SECRET
          );

          res.cookie('token', token, {
            maxAge: 60 * 60 * 30 * 1000,
            httpOnly: true,
          });
          console.log('login end');
          return user;
        }
      }
    },
  },
};

export default userResolvers;
