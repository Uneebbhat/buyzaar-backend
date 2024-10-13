import { Router } from "express";
import { uploadProduct } from "../controllers/UploadProduct";

const router = Router();

router.post("/upload-product", uploadProduct);

export default router;
