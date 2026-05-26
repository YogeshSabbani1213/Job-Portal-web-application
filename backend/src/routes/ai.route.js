import express from "express";
import upload from "../middleware/upload.js";
import { uploadResume } from "../controllers/ai.controller.js";
import { analyzeResume } from "../controllers/ai.controller.js";

const router = express.Router();

router.post(
  "/upload-resume",
  upload.single("resume"),
  uploadResume
);

router.post("/analyze-resume", analyzeResume);

export default router;