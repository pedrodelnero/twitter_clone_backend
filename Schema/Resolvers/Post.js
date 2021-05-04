import Sequelize from 'sequelize';

const op = Sequelize.Op;

const postResolvers = {
  Post: {
    likes: async (parent, _, { Like }) => {
      const likes = await Like.findAll({
        where: { postId: parent.dataValues.id },
      });
      // console.log('post - likes', likes);
      return likes;
    },
    user: async (parent, _, { User }) => {
      // console.log('post - user 0', parent);
      const user = await User.findOne({
        where: { id: parent.dataValues.ownerId },
      });
      // console.log('post - user', user);
      return user;
    },
  },

  Query: {
    posts: async (_, __, { Post }) => {
      const posts = await Post.findAll();
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
      // console.log('pFF START user-id', userId);
      // console.log('pFF START owner-id', ownerId);
      const pFFArr = await UserFollower.findAll({
        where: { [op.and]: [{ followedId: ownerId }, { followerId: userId }] },
      });

      // console.log('pFF MID', !!pFFArr.length, +ownerId === +userId);

      if (!!pFFArr.length || +ownerId === userId) {
        // console.log('pFF MID suc', pFFArr.length);
        return { success: true, message: 'User is following' };
      } else {
        // console.log('pFF MID fail', pFFArr.length);
        return { success: false, message: 'User is not following' };
      }
    },
  },
  Mutation: {
    createPost: async (_, { text }, { Post, user }) => {
      // console.log('POST 0');

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
