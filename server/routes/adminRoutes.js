import express from 'express'
import { adminVerification } from '../middleWares/adminAuth.js';
import { adminLogin, getAllUsers, getAllDoctors, blockUser, unBlockUser, verifyDoctor, doctorsRequest, getDoctor, removeDoctor } from '../controller/adminController.js';


const router=express.Router();

router.post("/login",adminLogin);

router.get("/allUsers",adminVerification,getAllUsers);

router.get("/allDoctors",adminVerification,getAllDoctors);

router.get("/getDoctor/:id",adminVerification,getDoctor)

router.put("/blockUser/:id",blockUser);

router.put("/unBlockUser/:id",unBlockUser);

router.put("/verifyDoctor/:id",verifyDoctor);

router.put("/rejectDoctor/:id",removeDoctor)

router.get("/doctorsRequest",adminVerification,doctorsRequest)


export default router;