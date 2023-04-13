import express from "express";
import { registerUser, userLogin, userDetails } from "../controller/userController.js";
const router = express.Router();


router.post("/signup", registerUser);

router.post("/login",userLogin);

router.get("/details/:id",userDetails)

export default router;
