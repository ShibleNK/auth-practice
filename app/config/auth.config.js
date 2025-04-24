import "dotenv/config";

export default {
  secret: process.env.SECRET_KEY || "your-256-bit-secret-fallback",
};
