import * as dotenv from 'dotenv';
dotenv.config();

import { ExpressApp } from "./express.js";

const app = new ExpressApp();
app.listen();
