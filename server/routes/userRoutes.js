import express from "express";
import { registerUser, userLogin, userDetails, updateDetails, session, updatePassword,chat, updateProfileImage, otpLogin,availability, allDoctors, getDoctor, bookSession, appointment} from "../controller/userController.js";
import upload from "../utils/multer.js";
const router = express.Router();




router.post("/signup", registerUser);

router.post("/login",userLogin);

router.get('/otpLogin/:id',otpLogin);

router.get("/details/:id",userDetails)

router.put("/updateDetails/:id",updateDetails)

router.put("/updatePassword/:id",updatePassword);

router.put("/updateUserImage/:id",upload.single('image'),updateProfileImage);

router.get("/allDoctors",allDoctors)

router.get("/getDoctor/:id",getDoctor)

router.post('/book_session',bookSession);

router.post('/appointment',appointment);

router.post('/availability',availability);

router.get("/getSession/:id",session);

router.get("/getChat",chat);

export default router;
