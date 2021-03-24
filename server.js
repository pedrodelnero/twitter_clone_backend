import express from 'express';
import cors from 'cors';
import pkg from 'express-graphql';

import schema from './Schema/index.js';
import { User, Post } from './Models/index.js';

const { graphqlHTTP } = pkg;
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context: { User, Post },
    graphiql: true,
  })
);

app.listen(port, () =>
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  )
);
