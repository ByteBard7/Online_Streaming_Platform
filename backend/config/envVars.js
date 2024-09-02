import dotenv from "dotenv";

dotenv.config();

const {
  MONGO_URI,
  PORT = 5000,
  JWT_SECRET,
  NODE_ENV,
  TMDB_API_KEY,
} = process.env;

if (!MONGO_URI) {
  throw new Error("Missing environment variable: MONGO_URI");
}

if (!JWT_SECRET) {
  throw new Error("Missing environment variable: JWT_SECRET");
}

if (!TMDB_API_KEY) {
  throw new Error("Missing environment variable: TMDB_API_KEY");
}

export const ENV_VARS = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  TMDB_API_KEY,
};
