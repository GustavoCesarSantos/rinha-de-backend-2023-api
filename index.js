import * as dotenv from "dotenv";
dotenv.config();

import { ExpressApp } from "./src/express.js";
import("./src/workers.js");
import("./src/queues.js");

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
