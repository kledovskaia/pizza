import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config();
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';

// TODO: add
// typeDefs
// resolvers

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is ready on ${url}`);
});
