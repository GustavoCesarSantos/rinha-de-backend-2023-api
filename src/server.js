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

// process.on("uncaughtException", (error, origin) => {
//   console.info({
//     where: "index",
//     what: `\n${origin} signal received. \n${error}`,
//   });
// });

// process.on("unhandledRejection", (error) => {
//   console.info({
//     where: "index",
//     what: `signal received. \n${error}`,
//   });
// });

process.on("SIGINT", gracefullShutdown("SIGINT"));

process.on("SIGTERM", gracefullShutdown("SIGTERM"));

// process.on("exit", (code) => {
//   console.info({
//     where: "index",
//     what: `'exit sigint received, code: ${code}`,
//   });
// });
