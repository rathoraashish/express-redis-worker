# Redis Express User API

A Node.js REST API demonstrating Redis caching with Express, featuring user data management and cache statistics.

## Features

- Express.js REST API
- Redis caching implementation
- JSON file-based data storage
- MVC architecture
- Error handling middleware
- Request logging with Morgan

## Prerequisites

- Node.js (v14 or higher)
- Docker
- Redis (running in Docker)

## Redis Setup

Start Redis using Docker:

```bash
docker run --name redis -p 6379:6379 -d redis
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   │   └── redis.js    # Redis client setup
│   ├── controllers/    # Request handlers
│   │   └── userController.js
│   ├── data/          # JSON data storage
│   │   └── users.json
│   ├── middleware/    # Custom middleware
│   │   └── errorHandler.js
│   ├── models/        # Data models
│   │   └── User.js
│   ├── routes/        # API routes
│   │   └── userRoutes.js
│   └── index.js       # Application entry point
```

## API Endpoints

### Users
- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Retrieve a specific user
- `GET /api/users/stats` - Get Redis cache statistics

## Caching Strategy

- User data is cached for 1 hour (3600 seconds)
- Cache is automatically invalidated after expiration
- Separate cache entries for individual users and the complete user list
- Cache-first approach with fallback to JSON file

## Error Handling

The API includes centralized error handling with:
- Custom error messages
- Appropriate HTTP status codes
- Stack traces in development mode

## Development

Run the server in development mode with hot reload:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## Redis Configuration

Redis connection settings can be modified in `src/config/redis.js`:
- Default URL: `redis://localhost:6379`
- Connection events logging
- Automatic reconnection handling