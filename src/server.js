import * as dotenv from "dotenv";
dotenv.config();

import { ExpressApp } from "./express.js";

const app = new ExpressApp();
const server = app.listen();

function gracefullShutdown(event) {
  return (code) => {
    server.close(() => {
      process.exit(code);
    });
  };
}

process.on("SIGINT", gracefullShutdown("SIGINT"));

process.on("SIGTERM", gracefullShutdown("SIGTERM"));
