import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import CustomError from "./utils/customError";
import { errorHandler } from "./middlewares/errorHandler";

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err.name, err.message);
  process.exit(1);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use("/api", router);

// Handle 404 for undefined routes
app.all("/{*splat}", (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    404,
    `Can't find ${req.originalUrl} in this server`,
  );
  next(err);
});

// Global Error Handler
app.use(errorHandler);

// Database Connection
// mongoose
//   .connect(DB_URI)
//   .then(() => console.log("Database Connected!"))
//   .catch((err: Error) => {
//     console.error("Database Connection Error:", err.message);
//     process.exit(1);
//   });

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server online: ${PORT}`));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection:", err.name, err.message);
  server.close(() => process.exit(1));
});
