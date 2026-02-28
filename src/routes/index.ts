import { Router } from "express";
import postIdeaController from "../controllers/postIdea.controller";
import requireAuth from "../middlewares/requireAuth";
import userRouter from "./user.routes";

const router = Router();

// Health / root
router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

// Protected: requires a valid Clerk session token
router.post("/idea", requireAuth, postIdeaController);

// User routes (sync & profile) — all protected
router.use("/users", userRouter);

export default router;
