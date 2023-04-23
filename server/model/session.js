import mongoose from "mongoose";

const SessionSchema=mongoose.Schema({


    userId:{
        type: String,
        required: true,
    },
    
    doctorId:{
        type: String,
        required: true,
    },

    timeSlot:{
        type: String,
        required: true,
    },

    sessionDate:{
        type: String,
        required: true,
    },
   
    bookedDate: {
        type: String,
        required: true,
    },

    plan: {
        type: String,
        required: true,
    }

})

const Session = mongoose.model('Session', SessionSchema);
export default Session;