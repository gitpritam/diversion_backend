import { Router } from "express";
import requireAuth from "../middlewares/requireAuth";
import { syncUser, getMe } from "../controllers/user.controller";

const userRouter = Router();

// All user routes are protected
userRouter.post("/sync", requireAuth, syncUser);
userRouter.get("/me", requireAuth, getMe);

export default userRouter;
