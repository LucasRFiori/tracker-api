import express from "express";
import "express-async-errors";
import { config } from "../project.config";
import router from "./routes";
import mongoose from "mongoose";
import RabbitMQMessageHandler from "./RabbitMQMessageHandler";

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    const app = express();

    console.log("✅ Connected to MongoDB");

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(express.json());

    app.use(router);

    app.listen(config.NODE_PORT, () => {
      console.log(`🚀 Server running at ${config.NODE_URL}`);
    });

    RabbitMQMessageHandler.consumeAndRemoveMessage();
  })
  .catch(() => {
    console.log("❌ Couldn't connect to MongoDB.");
  });
