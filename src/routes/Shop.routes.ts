import { Router } from "express";
import { createShop } from "../controllers/Shop";

const router = Router();

router.post("/create-shop", createShop);

export default router;
