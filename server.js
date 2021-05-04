import express from 'express';
import cors from 'cors';
import pkgLoadsh from 'lodash';
import apolloServerPkg from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import {
  postResolvers,
  userResolvers,
  likeResolvers,
  userFollowerResolvers,
} from './Schema/Resolvers/index.js';
import typeDefs from './Schema/TypeDefs/index.js';
import { User, Post, Like, UserFollower } from './Models/index.js';

const { merge } = pkgLoadsh;
const { ApolloServer, AuthenticationError } = apolloServerPkg;
const port = process.env.PORT || 4000;

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(
    {},
    userResolvers,
    postResolvers,
    likeResolvers,
    userFollowerResolvers
  ),
  context: async ({ req, res }) => {
    try {
      const token = req.cookies.token;
      if (!token) throw new Error('Not logged in.');

      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (!id) throw new Error('Not valid id.');

      const user = await User.findOne({ where: { id } });

      if (!user) throw new AuthenticationError('No user found with this token');

      return {
        user,
        User,
        Post,
        Like,
        UserFollower,
        res,
      };
    } catch (e) {
      return {
        User,
        Post,
        Like,
        UserFollower,
        res,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen(port, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  )
);
