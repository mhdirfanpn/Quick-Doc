import express from 'express'
import { adminLogin, getAllUsers, getAllDoctors, blockUser, unBlockUser, verifyDoctor } from '../controller/adminController.js';


const router=express.Router();

router.post("/login",adminLogin);

router.get("/allUsers",getAllUsers);

router.get("/allDoctors",getAllDoctors);

router.put("/blockUser/:id",blockUser);

router.put("/unBlockUser/:id",unBlockUser);

router.put("/verifyDoctor/:id",verifyDoctor);


export default router;