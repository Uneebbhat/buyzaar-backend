import { Router } from "express";
import { uploadProduct } from "../controllers/UploadProduct";
import multer from "multer"

const upload = multer({dest: "/uploads"})

const router = Router();

router.post("/upload-product", uploadProduct, upload.array(String(5)));

export default router;
