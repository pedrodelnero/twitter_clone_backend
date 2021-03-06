import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userResolvers = {
  User: {
    posts: async (parent, _, { Post }) => {
      const posts = await Post.findAll({
        where: { ownerId: parent.id },
      });
      return posts;
    },
    likes: async (parent, _, { Like }) => {
      const likes = await Like.findAll({
        where: { userId: parent.id },
      });
      return likes;
    },
    followers: async (parent, _, { UserFollower }) => {
      const followers = await UserFollower.findAll({
        where: { followedId: parent.id },
      });
      return followers;
    },
  },
  Query: {
    getAllUsers: async (_, __, { User }) => {
      const users = await User.findAll();
      return users;
    },
    getOneUser: async (_, __, { user }) => {
      try {
        if (!user) {
          throw new Error('No user found.');
        } else {
          return {
            success: true,
            user,
          };
        }
      } catch (e) {
        return {
          success: false,
          message: e.message,
        };
      }
    },
    isAuth: async (_, __, { user }) => {
      try {
        if (!user) {
          throw new Error('No user found with id.');
        } else {
          return {
            success: true,
            user,
          };
        }
      } catch (e) {
        return {
          success: false,
          message: e.message,
        };
      }
    },
  },
  Mutation: {
    createUser: async (
      _,
      { name, handle, password, confirmPassword },
      { User, res }
    ) => {
      try {
        console.log('create user start', name);
        if (!name || !handle || !password || !confirmPassword)
          throw new Error('Missing input value');

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        const user = await User.findOne({ where: { handle } });

        if (user) {
          throw new Error('Handle already taken');
        } else {
          const newUser = await User.create({
            name,
            handle,
            password: bcrypt.hashSync(password, 8),
          });

          const token = jwt.sign(
            { id: newUser.dataValues.id.toString() },
            process.env.JWT_SECRET
          );

          res.cookie('token', token, {
            maxAge: 4 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.cookie('auth', newUser.dataValues.id, {
            maxAge: 4 * 60 * 60 * 1000,
          });

          return { success: true, user: newUser };
        }
      } catch (e) {
        return { success: false, message: e.message };
      }
    },
    deleteUser: async (_, { id }, { User, Post }) => {
      if (!id) throw new Error('Missing field');

      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new Error('No user with id');
      } else {
        await Post.destroy({ where: { ownerId: id } });
        await User.destroy({ where: { id } });

        return { message: 'User deleted.' };
      }
    },
    loginUser: async (_, { handle, password }, { User, res }) => {
      try {
        if (!handle || !password) throw new Error('Missing field');
        const user = await User.findOne({ where: { handle } });

        if (!user) {
          throw new Error('No user with handle.');
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
              maxAge: 4 * 60 * 60 * 1000,
              httpOnly: true,
            });
            res.cookie('auth', user.dataValues.id, {
              maxAge: 4 * 60 * 60 * 1000,
            });
            return { success: true, user };
          }
        }
      } catch (e) {
        return {
          success: false,
          message: e.message.substring(0, e.message.length),
        };
      }
    },
  },
};

export default userResolvers;
