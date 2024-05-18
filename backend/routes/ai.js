import express from "express";
import { ai, aiVideos } from "../controllers/ai.js";

const router = express.Router();

router.post("/ai", ai);

router.post("/ai/studyVideos", aiVideos);


export default router;