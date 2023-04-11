import express from "express";
import { registerDoctor, doctorLogin, doctorDetails } from "../controller/doctorController.js";
const router = express.Router();


router.post("/signup",registerDoctor);

router.post("/login",doctorLogin);

router.get("/details/:id",doctorDetails)

export default router;