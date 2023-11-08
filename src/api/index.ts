import express from "express";
import "express-async-errors";
import { config } from "../project.config";
import router from "./routes";
import mongoose from "mongoose";
import RabbitMQMessageHandler from "./RabbitMQMessageHandler";
import http from "node:http";
import { Server } from "socket.io";
import { metricsServer } from "../gRPC/metricsServer";
import * as grpc from "@grpc/grpc-js";
import { schema } from "../graphql/schema";
import { graphqlHTTP } from "express-graphql";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: config.VITE_URL,
    methods: ["GET"],
  },
});

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(express.json());

    app.use(router);

    app.use(
      config.GRAPHQL_PATH,
      graphqlHTTP({
        schema: schema,
        graphiql: true,
      })
    );

    server.listen(config.NODE_PORT, () => {
      console.log(`🚀 Tracking API running at ${config.NODE_URL}`);
      console.log(
        `🚀 Metric GRAPHQL running at ${config.NODE_URL}${config.GRAPHQL_PATH}`
      );
    });

    metricsServer.bindAsync(
      config.GRPC_URL,
      grpc.ServerCredentials.createInsecure(),
      () => {
        metricsServer.start();
        console.log(`🚀 Metric API running at ${config.GRPC_URL}`);
      }
    );

    RabbitMQMessageHandler.queueController();
  })
  .catch(() => {
    console.log("❌ Couldn't connect to MongoDB.");
  });
