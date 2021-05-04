const LikeResolvers = {
  Like: {
    user: async (parent, _, { User }) => {
      // console.log('User by Like START');
      const user = await User.findOne({
        where: { id: parent.dataValues.userId },
      });
      // console.log('User by Like MID', {
      //   id: user.dataValues.id,
      //   name: user.dataValues.name,
      // });
      return user;
    },
    post: async (parent, _, { Post }) => {
      // console.log('Post by Like START');
      const post = await Post.findOne({
        where: { id: parent.dataValues.postId },
      });
      // console.log('Post by Like MID', {
      //   id: post.dataValues.id,
      //   ownerId: post.dataValues.ownerId,
      // });
      return post;
    },
  },
  Query: {
    getLikesByPost: async (_, { postId }, { Like }) => {
      // console.log('Likes by POST | START');
      const likes = await Like.findAll({ where: { postId } });
      return likes;
    },
    getLikesByUser: async (_, __, { Like, user }) => {
      // console.log('Likes by USER | START');
      if (!user) {
        return { message: 'Not authorized.' };
      } else {
        const likes = await Like.findAll({
          where: { userId: user.dataValues.id },
        });
        // console.log('getLikesByPost MID');
        return likes;
      }
    },
  },
  Mutation: {
    createLike: async (_, { postId }, { user, Like }) => {
      // console.log('ADD LIKE', postId, user.dataValues.name);

      if (!user) {
        throw new Error('No user found with id.');
      } else {
        const like = Like.create({ postId, userId: user.dataValues.id });

        return like;
      }
    },
    deleteLike: async (_, { postId }, { Like, user }) => {
      // console.log('DELETE LIKE', postId, user.dataValues.name);
      const like = await Like.findOne({
        where: { userId: user.dataValues.id, postId },
      });

      if (!like) {
        throw new Error('No like found with id.');
      } else {
        await Like.destroy({ where: { id: like.dataValues.id } });

        return { message: 'Like deleted.' };
      }
    },
  },
};

export default LikeResolvers;
