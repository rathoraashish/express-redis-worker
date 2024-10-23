const { createClient } = require('redis');

const client = createClient({
  url: 'redis://127.0.0.1:6379'
});

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

const connectRedis = async () => {
  await client.connect();
};

module.exports = { client, connectRedis };