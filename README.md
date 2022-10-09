# DEVconnect - A Social Media Platform for Developers


## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the Devconnect frontend at [localhost:8000](http://localhost:8000) connect with other developers!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t devconnect .`
3. Run `docker run -it -p 8000:8000 devconnect`

