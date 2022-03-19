import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import * as models from './models/index.js';

mongoose.connect(process.env.MONGO_DB);

const server = new ApolloServer({
  cors: {
    origin: '*',
    credentials: true,
  },
  typeDefs,
  resolvers,
  context: () => ({ models }),
});

server.listen().then(({ url }) => {
  console.log(`Server is ready on ${url}`);
});
