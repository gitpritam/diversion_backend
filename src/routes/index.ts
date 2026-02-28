import { Router } from "express";
import postIdeaController from "../controllers/postIdea.controller";

const router = Router();

// Register sub-routes here
// e.g. router.use("/users", userRouter);

router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

router.post("/idea", postIdeaController);

export default router;
