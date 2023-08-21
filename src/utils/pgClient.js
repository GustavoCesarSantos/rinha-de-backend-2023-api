import * as dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 100,
});

pool.on("error", async (err, client) => {
  await pool.end();
  process.exit(-1);
});
