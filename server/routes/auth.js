import express from "express";
import { signIn } from "../controllers/auth.js";
import { createUser } from "../controllers/auth.js";
import { getCurrentUser } from "../controllers/auth.js";
const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", createUser);

router.get("/current-user", getCurrentUser);

export default router;
