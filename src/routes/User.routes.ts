import { Router } from "express";
import { login, signup } from "../controllers/UserController";
import multer from "multer";

const upload = multer({ dest: "/uploads" });

const router = Router();

router.post("/v1/signup", signup, upload.single("profilePic"));
router.post("/v1/login", login);

export default router;
