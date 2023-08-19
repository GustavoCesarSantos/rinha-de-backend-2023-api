import express from "express";

import { routes } from "./routes.js";

export class ExpressApp {
    constructor(){
        this.app = express();
        this.app.use(express.json());
    }

    listen() {
        const port = 3333;
        this.app.listen(port, () => console.info(`Server running at ${port}`));
    }

    setRoutes() {
        const router = express.Router();
        routes(router);
        this.app.use(router);
    }

}
