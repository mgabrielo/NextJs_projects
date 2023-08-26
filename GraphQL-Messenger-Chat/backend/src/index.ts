// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as dotenv from "dotenv";
const { json } = pkg;
// import { typeDefs, resolvers } from "./schema";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

interface MyContext {
  token?: String;
}
async function main() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  };
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

main().catch((err) => console.log(err));
