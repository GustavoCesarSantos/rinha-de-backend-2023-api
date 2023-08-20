import express from "express";
import cors from "cors";

import { routes } from "./routes.js";

export class ExpressApp {
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  setCors() {
    const options = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
      ],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false,
    };
    this.app.use(cors(options));
  }

  setRoutes() {
    const router = express.Router();
    routes(router);
    this.app.use(router);
  }

  listen() {
    this.setCors();
    this.setRoutes();
    const port = process.env.PORT || 3333;
    this.app.listen(port, () => console.info(`Server running at ${port}`));
  }
}
