import express from "express";
import "express-async-errors";
import { config } from "../project.config";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(config.NODE_PORT, () => {
  console.log(`🚀 Server running at ${config.NODE_URL}`);
});
