import express from "express";
import { config } from "../project.config";
// import router from "./routes";

const app = express();

// app.use(router);

app.get("/", (request, response) => {
  return response.send("Hello!");
});

app.listen(config.NODE_PORT, () => {
  console.log(`🚀 Server running at http://localhost:${config.NODE_PORT}`);
});
