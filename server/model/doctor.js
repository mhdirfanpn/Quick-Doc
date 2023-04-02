import mongoose from "mongoose";

const DoctorSchema=mongoose.Schema({
    
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    }

})

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;