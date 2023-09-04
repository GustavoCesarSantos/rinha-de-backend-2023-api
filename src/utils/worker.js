import { Worker } from "bullmq";

export const createWorker = function (queueName, workerFunction, options = {}) {
  const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  };
  return new Worker(queueName, workerFunction, { connection, ...options });
};
