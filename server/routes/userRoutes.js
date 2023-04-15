import express from "express";
import { registerUser, userLogin, userDetails, updateDetails, updatePassword, updateProfileImage } from "../controller/userController.js";
import upload from "../utils/multer.js";
const router = express.Router();




router.post("/signup", registerUser);

router.post("/login",userLogin);

router.get("/details/:id",userDetails)

router.put("/updateDetails/:id",updateDetails)

router.put("/updatePassword/:id",updatePassword);

router.put("/updateUserImage/:id",upload.single('image'),updateProfileImage);


export default router;
