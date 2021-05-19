const LikeResolvers = {
  Like: {
    user: async (parent, _, { User }) => {
      const user = await User.findOne({
        where: { id: parent.dataValues.userId },
      });

      return user;
    },
    post: async (parent, _, { Post }) => {
      const post = await Post.findOne({
        where: { id: parent.dataValues.postId },
      });

      return post;
    },
  },
  Query: {
    getLikesByPost: async (_, { postId }, { Like }) => {
      const likes = await Like.findAll({ where: { postId } });
      return likes;
    },
    getLikesByUser: async (_, __, { Like, user }) => {
      if (!user) {
        return { message: 'Not authorized.' };
      } else {
        const likes = await Like.findAll({
          where: { userId: user.dataValues.id },
        });
        return likes;
      }
    },
  },
  Mutation: {
    toggleLike: async (_, { postId }, { user, Like }) => {
      const userId = user.dataValues.id;
      try {
        const found = await Like.findOne({
          where: { postId, userId },
        });
        if (!found) {
          await Like.create({ postId, userId });
          return { success: true, message: 'Liked' };
        } else {
          await Like.destroy({
            where: { postId, userId },
          });
          return { success: true, message: 'Unliked' };
        }
      } catch (e) {
        return { success: false, message: e.message };
      }
    },
  },
};

export default LikeResolvers;
