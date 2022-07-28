import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import express from "express";
import sequelize from "./database/database.js";
import ApiKey from "./database/Apikey.js";
const app = express();

sequelize.sync().then(() => console.log("db is ready"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";

    const findKey = await ApiKey.findOne({ where: { apiKey: token } });
    return { findKey };
  },
});

await server.start();

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () => {
  console.log("Listening on port 3001");
});
