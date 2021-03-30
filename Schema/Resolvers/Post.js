const postResolvers = {
  Query: {
    getAllPosts(parent, args, { Post }) {
      const posts = Post.findAll();
      return posts;
    },
    async getOnePost(parent, { id }, { Post }) {
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
  },
  Mutation: {
    async createPost(parent, { id, text }, { Post, User }) {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        throw new Error('No user found with id.');
      } else {
        const post = Post.create({ text, ownerId: id });

        return post;
      }
    },
    async deletePost(parent, { id, text }, { Post }) {
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
