import express from "express";
import "express-async-errors";
import { config } from "../project.config";
import router from "./routes";
import mongoose from "mongoose";
import RabbitMQMessageHandler from "./RabbitMQMessageHandler";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

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

    server.listen(config.NODE_PORT, () => {
      console.log(`🚀 Server running at ${config.NODE_URL}`);
    });

    RabbitMQMessageHandler.queueController();
  })
  .catch(() => {
    console.log("❌ Couldn't connect to MongoDB.");
  });
