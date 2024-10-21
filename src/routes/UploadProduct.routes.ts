import { Router } from "express";
import { uploadProduct } from "../controllers/UploadProduct";
import multer from "multer";

const upload = multer({ dest: "uploads" });

const router = Router();

router.post("/upload-product", upload.array("images", 10), uploadProduct);

export default router;
