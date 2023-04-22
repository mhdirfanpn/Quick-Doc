import express from "express";
import { registerDoctor, doctorLogin, doctorDetails, updateDetails ,updatePassword, updateProfileImage, timeSlot} from "../controller/doctorController.js";
const router = express.Router();
import upload from "../utils/multer.js";


router.post("/signup",registerDoctor);

router.post("/login",doctorLogin);

router.get("/details/:id",doctorDetails)

router.put("/updateDetails/:id",updateDetails)

router.put("/updatePassword/:id",updatePassword);

router.put("/updateDoctorImage/:id",upload.single('image'),updateProfileImage);

router.post('/timeSlot',timeSlot);



export default router;