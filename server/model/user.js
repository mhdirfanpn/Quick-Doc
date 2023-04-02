import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    
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
    isBlocked:{
        type:Boolean,
        default:false
    }

})

const User = mongoose.model('User', UserSchema);
export default User;