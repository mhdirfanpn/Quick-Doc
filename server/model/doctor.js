import mongoose from "mongoose";


  

const DoctorSchema=mongoose.Schema({

    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    
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
    experience:{
        type:String,
        required:true
    },
    register:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    timeSlot:{
        type:Array,
        default:''
    },
       

    appointments: [
        {
            date: { type: Date, required: true },
            times: [{ type: String, required: true }],
          },
      ],

})

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;