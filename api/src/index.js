import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import * as models from './models/index.js';

const port = process.env.PORT;
const app = express();
app.use(cors());
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

await server.start();

server.applyMiddleware({ app, path: '/api' });
app.listen({ port });
