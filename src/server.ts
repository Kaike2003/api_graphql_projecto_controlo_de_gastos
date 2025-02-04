import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "node:path";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import { formatError } from "./config/formatError/formatError";
import { dataSources } from "./config/dataSource/dataSources";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redis = createClient({ url: process.env.REDIS_URL });

const allTypes = loadFilesSync(join(__dirname, "graphql", "**", "*.gql"));
const allResolvers = loadFilesSync(join(__dirname, "graphql", "**", "resolvers.ts"));

const typeDefs = mergeTypeDefs(allTypes);
const resolvers = mergeResolvers(allResolvers);

const main = async () => {
  const server = new ApolloServer({ typeDefs, resolvers, formatError, dataSources });
  await server.start();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
  //app.use(morgan("dev"));
  /* const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });
  app.use(limiter); */

  server.applyMiddleware({ app });

  redis
    .connect()
    .then(() => {
      console.log("Successfully connected to redis");
      app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

main();
