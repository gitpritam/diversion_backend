import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: parseInt(process.env["PORT"] ?? "3000", 10),
  NODE_ENV: process.env["NODE_ENV"] ?? "development",
  GEMINI_API: process.env["GEMINI_API"] ?? "",
  CLERK_PUBLISHABLE_KEY: process.env["CLERK_PUBLISHABLE_KEY"] ?? "",
  CLERK_SECRET_KEY: process.env["CLERK_SECRET_KEY"] ?? "",
  DB_URI: process.env["DB_URI"] ?? "",
};
