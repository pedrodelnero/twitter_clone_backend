import Sequelize from 'sequelize';

const op = Sequelize.Op;

const postResolvers = {
  Post: {
    likes: async (parent, _, { Like }) => {
      const likes = await Like.findAll({
        where: { postId: parent.dataValues.id },
      });
      return likes;
    },
    user: async (parent, _, { User }) => {
      const user = await User.findOne({
        where: { id: parent.dataValues.ownerId },
      });
      return user;
    },
  },

  Query: {
    posts: async (_, __, { Post }) => {
      const posts = await Post.findAll({ order: [['updatedAt', 'DESC']] });
      return posts;
    },
    getOnePost: async (_, { id }, { Post }) => {
      const post = await Post.findOne({ where: { id } });

      if (!post) {
        throw new Error('No post found with id.');
      } else {
        return {
          id: post.dataValues.id,
          text: post.dataValues.text,
          ownerId: post.dataValues.ownerId,
        };
      }
    },
    postsByUser: async (_, __, { Post, user }) => {
      const posts = await Post.findAll({
        where: { ownerId: user.dataValues.id },
      });
      if (!posts) {
        return { message: 'No posts for user.' };
      } else {
        return posts;
      }
    },
    postsForFollower: async (_, { ownerId }, { UserFollower, user }) => {
      const userId = user.dataValues.id;

      const pFFArr = await UserFollower.findAll({
        where: { [op.and]: [{ followedId: ownerId }, { followerId: userId }] },
      });

      if (!!pFFArr.length || +ownerId === userId) {
        return { success: true, message: 'User is following' };
      } else {
        return { success: false, message: 'User is not following' };
      }
    },
  },
  Mutation: {
    createPost: async (_, { text }, { Post, user }) => {
      if (!user) {
        throw new Error('No user found with id.');
      } else {
        const post = Post.create({ text, ownerId: user.dataValues.id });

        return post;
      }
    },
    deletePost: async (_, { id }, { Post }) => {
      const post = await Post.findOne({ where: { id } });

      if (!post) {
        throw new Error('No post found with id.');
      } else {
        await Post.destroy({ where: { id } });

        return { message: 'Post deleted.' };
      }
    },
  },
};

export default postResolvers;
