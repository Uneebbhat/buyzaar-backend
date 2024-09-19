import { Router } from "express";
import { login, otpSignup, signup } from "../controllers/UserController";

const router = Router();

router.post("/v1/signup", signup);
router.post("/v1/login", login);
router.post("/sendotp", otpSignup);

export default router;
