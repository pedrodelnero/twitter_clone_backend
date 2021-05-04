import Sequelize from 'sequelize';

const op = Sequelize.Op;

const userFollowerResolvers = {
  UserFollower: {
    followed: async (parent, _, { User }) => {
      const user = await User.findOne({
        where: { id: parent.dataValues.followedId },
      });
      return user;
    },
    follower: async (parent, _, { User }) => {
      const user = await User.findOne({
        where: { id: parent.dataValues.followerId },
      });
      return user;
    },
  },
  Query: {
    userFollowers: async (_, { followedId }, { UserFollower }) => {
      // console.log('userFollowers START');
      const users = await UserFollower.findAll({ where: { followedId } });

      // console.log('userFollower MID -------');
      return users;
    },
    userFollowersAndFollowed: async (_, __, { Post, UserFollower, user }) => {
      const userId = user.dataValues.id;
      console.log('uFF START', userId);
      const uFFArr = await UserFollower.findAll({
        where: { [op.or]: [{ followedId: userId }, { followerId: userId }] },
      });
      const posts = [];
      async function getPostsArray(item) {
        console.log('get Post Array 0', item);
        const response = await Post.findAll({ where: { ownerId: item } });
        console.log('get Post Array 1', response);
        const postsToPush = await response;
        posts.push(postsToPush);
      }
      await Promise.all(
        uFFArr.map((uFFItem) => {
          if (uFFItem.dataValues.followerId === user.dataValues.id) {
            console.log('Follower');
            getPostsArray(uFFItem.dataValues.followedId);
          } else {
            console.log('Followed');
          }
        })
      );
      console.log('uFF MID', posts);
      // console.log('userFollower MID -------');
      return users;
    },
  },
  Mutation: {
    followUser: async (_, { followedId }, { UserFollower, user }) => {
      // console.log('FOLLOWING', followedId);
      if (!user) {
        throw new Error('Not logged in.');
      } else {
        const newUserFollower = await UserFollower.create({
          followedId,
          followerId: user.dataValues.id,
        });

        return newUserFollower;
      }
    },
    unfollowUser: async (_, { followedId }, { UserFollower, user }) => {
      // console.log('UN-FOLLOWING', followedId, user);
      const result = await UserFollower.destroy({
        where: { followedId, followerId: user.dataValues.id },
      });
      if (!user) {
        throw new Error('Not logged in.');
      } else if (!result) {
        throw new Error('Not following.');
      } else {
        await UserFollower.destroy({ where: { id: result.dataValues.id } });

        return { message: 'Un-following' };
      }
    },
  },
};

export default userFollowerResolvers;
