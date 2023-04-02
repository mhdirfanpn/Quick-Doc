import express from "express";
import { registerUser, userLogin } from "../controller/userController.js";
import { verifyToken } from "../middleWares/userAuth.js";
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login",userLogin)

router.get("/sample",verifyToken,(req,res)=>{
    res.json({message:"set"})
})

export default router;
