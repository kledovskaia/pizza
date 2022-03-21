import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import * as models from './models/index.js';

async function startApolloServer({ typeDefs, resolvers, models }) {
  const app = express();
  app.use(cors());
  mongoose.connect(process.env.MONGO_DB);
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ models }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
}

startApolloServer({
  typeDefs,
  resolvers,
  models,
});
