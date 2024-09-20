import { Router } from "express";
import { login, signup } from "../controllers/UserController";

const router = Router();

router.post("/v1/signup", signup);
router.post("/v1/login", login);

export default router;
