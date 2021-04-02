import express from 'express';
import cors from 'cors';
import pkgLoadsh from 'lodash';
import apolloServerPkg from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { postResolvers, userResolvers } from './Schema/Resolvers/index.js';
import { postTypeDef, userTypeDef } from './Schema/TypeDefs/index.js';
import { User, Post } from './Models/index.js';

const { merge } = pkgLoadsh;
const { ApolloServer } = apolloServerPkg;
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
  typeDefs: [userTypeDef, postTypeDef],
  resolvers: merge({}, userResolvers, postResolvers),
  context: async ({ req, res }) => {
    const token = req.cookies.token;
    console.log('ctx start', token);

    if (!token) return { User, Post, res };

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ id });

    if (!user) throw new Error('No user found with this token');

    return {
      user,
      User,
      Post,
      res,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen(port, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  )
);
