import express from "express";
import { registerDoctor, doctorLogin } from "../controller/doctorController.js";
const router = express.Router();



router.post("/signup",registerDoctor);

router.post("/login",doctorLogin)

export default router;