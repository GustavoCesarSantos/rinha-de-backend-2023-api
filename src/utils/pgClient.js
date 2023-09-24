import * as dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

let retry = 5;

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 25,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 10000,
});

export const pgConnect = async function () {
  try {
    console.info(`Connecting to db ${process.env.POSTGRES_DB}`);
    await pool.connect();
  } catch (error) {
    if (retry > 0) {
      setTimeout(() => {
        pgConnect();
        console.error(
          `An error occured when connecting retrying connection on 3 secs. Error: ${error}`
        );
      }, 3000);
      retry--;
      return;
    }
    throw new Error(
      `Failed to connect to database: ${process.env.POSTGRES_DB}`
    );
  }
};

export const pgQuery = async function (query, params) {
  try {
    return await pool.query(query, params);
  } catch (error) {
    throw new Error(error.message);
  }
};

pool.on("error", (err, client) => {
  console.error(err);
  throw new Error(err.message);
});

pool.once("connect", () => {
  console.info(`Connected  to db ${process.env.POSTGRES_DB}`);
  console.info(`Creating table "pessoas" if not exists`);
  return pool.query(`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack JSON)
        RETURNS TEXT AS $$
        BEGIN
        RETURN _nome || _apelido || _stack;
        END;
    $$ LANGUAGE plpgsql IMMUTABLE;

    CREATE TABLE IF NOT EXISTS pessoas (
        id uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL,
        apelido TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        nascimento DATE NOT NULL,
        stack JSON,
        searchable text GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED
    );

    CREATE INDEX IF NOT EXISTS idx_pessoas_searchable ON public.pessoas USING gist (searchable public.gist_trgm_ops (siglen='64'));

    CREATE UNIQUE INDEX IF NOT EXISTS pessoas_apelido_index ON public.pessoas USING btree (apelido);
  `);
});
