// const resolvers = {
//   Query: {
//     getAllUsers(parent, args, { User }) {
//       const users = User.findAll();
//       return users;
//     },
//     async getOneUser(parent, { id }, { User }) {
//       const { dataValues } = await User.findOne({ where: { id } });

//       return {
//         id: dataValues.id,
//         name: dataValues.name,
//         handle: dataValues.handle,
//       };
//     },
//   },
//   Mutation: {
//     createUser(parent, { name, handle, password }, { User }) {
//       const user = User.create({ name, handle, password });
//       return { id: user.id };
//     },
//   },
// };

// export default resolvers;

export { default as postResolvers } from './Post.js';
export { default as userResolvers } from './User.js';
export { default as likeResolvers } from './Like.js';
export { default as userFollowerResolvers } from './UserFollower.js';
