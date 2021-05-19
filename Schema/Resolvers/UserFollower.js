import Sequelize from 'sequelize';

const op = Sequelize.Op;

const userFollowerResolvers = {
  UserFollower: {
    followed: async (parent, _, { User }) => {
      try {
        const user = await User.findOne({
          where: { id: parent.dataValues.followedId },
        });
        return user;
      } catch (err) {
        console.log('followed query err', err);
      }
    },
    follower: async (parent, _, { User }) => {
      try {
        const user = await User.findOne({
          where: { id: parent.dataValues.followerId },
        });
        return user;
      } catch (err) {
        console.log('follower query err', err);
      }
    },
  },
  Query: {
    userFollowers: async (_, { followedId }, { UserFollower }) => {
      try {
        const followers = await UserFollower.findAll({ where: { followedId } });

        if (followers.length === 0) return { success: false };

        return { followers, success: true };
      } catch (err) {
        console.log('UF query err', err);
      }
    },
    userFollowersAndFollowed: async (_, __, { Post, UserFollower, user }) => {
      const userId = user.dataValues.id;

      const uFFArr = await UserFollower.findAll({
        where: { [op.or]: [{ followedId: userId }, { followerId: userId }] },
      });
      const posts = [];
      async function getPostsArray(item) {
        const response = await Post.findAll({ where: { ownerId: item } });
        const postsToPush = await response;
        posts.push(postsToPush);
      }
      await Promise.all(
        uFFArr.map((uFFItem) => {
          if (uFFItem.dataValues.followerId === user.dataValues.id) {
            getPostsArray(uFFItem.dataValues.followedId);
          } else {
          }
        })
      );
      return users;
    },
  },
  Mutation: {
    toggleFollow: async (_, { followedId }, { UserFollower, user }) => {
      try {
        const found = await UserFollower.findOne({
          where: { followedId, followerId: user.dataValues.id },
        });
        if (!found) {
          await UserFollower.create({
            followedId,
            followerId: user.dataValues.id,
          });
          return { success: true, message: 'Following' };
        } else {
          await UserFollower.destroy({
            where: { followedId: followedId, followerId: user.dataValues.id },
          });
          return { success: true, message: 'Un-following' };
        }
      } catch (e) {
        return { success: false, message: e.message };
      }
    },
  },
};

export default userFollowerResolvers;
