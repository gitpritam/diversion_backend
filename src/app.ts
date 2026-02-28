import express from "express";
import cors from "cors";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
