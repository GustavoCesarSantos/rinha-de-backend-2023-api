import IORedis from 'ioredis';

export const IORedisCliente = new IORedis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: 'default',
  password: process.env.REDIS_PASSWORD
});
