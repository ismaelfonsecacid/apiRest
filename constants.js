const dotenv = require('dotenv');
const DB_USER = "admin";
const DB_PASSWORD = "admin123456";
const DB_HOST = "cluster0.913ryat.mongodb.net";

const API_VERSION = "v1";
const IP_SERVER = "localhost";

const JWT_SECRET_KEY = "jfkldf8934ji3";
dotenv.config();
const env = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY
}

module.exports = {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  API_VERSION,
  IP_SERVER,
  JWT_SECRET_KEY,
  env
};
