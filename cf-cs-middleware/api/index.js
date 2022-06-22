import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
// const { ApolloServer, gql } = require("apollo-server");
const home = require("../src/controller/homeController");
const about = require("../src/controller/aboutController");
const typeDefs = require("../src/graphql/typeDef");
const pdp = require("../src/controller/pdpController");

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const resolvers = {
  Query: {
    hello: () => "world",
    getHomePageData: async () => {
      const homePageData = await home.home();
      return homePageData;
    },
    getAboutUsData: async () => {
      const aboutUsData = await about.aboutContentful();
      return aboutUsData;
    },
    getAboutUsContentStackData: async () => {
      const aboutUsData = await about.aboutContentStack();
      return aboutUsData;
    },
    getPDPData: async (parent, args, context, info) => {
      const pdpData = await pdp.pdpData(args);
      return pdpData;
    },
    getPLPData: async (parent, args, context, info) => {
      const plpData = await pdp.plpData(args);
      return plpData;
    },
    getOnlyPLPData: async (parent, args, context, info) => {
      const onlyPLPData = await pdp.onlyPLPData(args);
      return onlyPLPData;
    },
  },
};

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;

/* const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
}); */
