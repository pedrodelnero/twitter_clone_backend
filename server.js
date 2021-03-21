import express from 'express';
import cors from 'cors';
import expressGraQL from 'express-graphql';
import graphql from 'graphql';

import schema from './Schema/index.js';

const { graphqlHTTP } = expressGraQL;
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // rootValue: root,
    graphiql: true,
  })
);
app.listen(port, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  )
);
