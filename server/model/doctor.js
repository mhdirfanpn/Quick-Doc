import mongoose from "mongoose";

const DoctorSchema=mongoose.Schema({


    
    fullName:{
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
    number:{
        type:String,
        required:true
    },
    date:{
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