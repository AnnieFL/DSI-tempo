import express from "express";
import { saveDadosLog, getDadosLog } from "../controllers/controller.js";

const router = express.Router();

router.post('/',saveDadosLog);
router.get('/',getDadosLog);

export default router;