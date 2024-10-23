const asyncHandler = require('express-async-handler');
const { client } = require('../config/redis');
const User = require('../models/User');

const CACHE_EXPIRATION = 3600; // 1 hour

const getAllUsers = asyncHandler(async (req, res) => {
  // Try to get from cache first
  const cachedUsers = await client.get('users');
  
  if (cachedUsers) {
    console.log("Cache hit")
    return res.json(JSON.parse(cachedUsers));
  }

  console.log("Cache miss")
  // If not in cache, get from "database" (json file)
  const users = await User.findAll();
  
  // Store in cache
  await client.setEx('users', CACHE_EXPIRATION, JSON.stringify(users));
  
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Try to get from cache first
  const cachedUser = await client.get(`user:${id}`);

  
  if (cachedUser) {
    console.log("Cache hit");
    return res.json(JSON.parse(cachedUser));
  }

  console.log("Cache miss");
  // If not in cache, get from "database"
  const user = await User.findById(id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Store in cache
  await client.setEx(`user:${id}`, CACHE_EXPIRATION, JSON.stringify(user));
  
  res.json(user);
});

const getCacheStats = asyncHandler(async (req, res) => {
  const info = await client.info();
  res.json({ info });
});

module.exports = {
  getAllUsers,
  getUserById,
  getCacheStats
};