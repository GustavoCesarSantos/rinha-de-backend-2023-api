import { Queue } from "bullmq";

export const createQueue = function (queueName, options = {}) {
  const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  };
  return new Queue(queueName, { connection, ...options });
};
