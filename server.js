import express from 'express';
import cors from 'cors';
import pkgLoadsh from 'lodash';
import apolloServerPkg from 'apollo-server-express';

import { postResolvers, userResolvers } from './Schema/Resolvers/index.js';
import { postTypeDef, userTypeDef } from './Schema/TypeDefs/index.js';
import { User, Post } from './Models/index.js';

const { merge } = pkgLoadsh;
const { ApolloServer } = apolloServerPkg;
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs: [userTypeDef, postTypeDef],
  resolvers: merge({}, userResolvers, postResolvers),
  context: { User, Post },
});

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  )
);
