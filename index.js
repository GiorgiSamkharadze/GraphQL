import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import express from "express";
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () => {
  console.log("Listening on port 3001");
});
