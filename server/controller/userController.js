import User from '../model/user.js'
import Session from '../model/session.js'
import Doctor from '../model/doctor.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js'
import moment from 'moment'



export const registerUser = async (req,res) => {
    try {
        const {email,password,userName,number,date,}=req.body

        if(!email || !password || !number || !userName || !date){
            return res.status(401).json({message:'all fields are required'})
        }

        const userDetails = await User.findOne({email})

        if(userDetails){
            res.status(200).json({success:false,message:"User already Registered"})
         }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser= await User.create({
               userName,
               email,
               password:hashedPassword,
               number,
               date,
            })
            res.status(200).json({success:true,message:"success new user created",user:newUser})
         }

    } catch (error) {
          res.status(500).json({error:error})
    }
}



export const userLogin = async(req,res)=>{
    try{
        const {email,password}=req.body;

          if(!email || !password){
            return res.status(401).json({message:'all fields are required'})
          }
       
          const userDetails=await User.findOne({email});

          if(userDetails){

            if(userDetails.isBlocked){
               return res.status(200).json({success:false,message:"User is blocked"})    
            }

             const passMatch=await bcrypt.compare(password,userDetails.password);

             if(!passMatch){
                return res.status(200).json({success:false,message:"User Password is Invalid"})
             }
             
             const token=jwt.sign({id:userDetails._id,name:userDetails.userName,email:userDetails.email,number:userDetails.number},process.env.JWT_SECRET,{expiresIn:'30d'});
             res.status(200).json({success:true,token,userDetails})

          }else{
             res.status(200).json({success:false,message:"User not found"})
          } 
       }   

       catch(err){
        res.status(400).json({error:err})
     }
 }



 export const otpLogin = async(req,res) => {
   try {

       let userDetails = await User.findOne({number:req.params.id});
       
       if(userDetails){
           const token=jwt.sign({id:userDetails._id,name:userDetails.userName},process.env.JWT_SECRET,{expiresIn:'30d'});
           return res.status(202).json({message:'user exist',token})
       }
       res.status(203).json({message:"mobile no. mismatch"})
   } catch (error) {
       console.log(error);
       res.status(500).json({message:`Error -> ${error}`})
   }
}


 export const userDetails = async(req,res) => {
   try {
      const userDetails = await User.findOne({_id:req.params.id})
      res.status(200).json({message:"user data sent successfully",userDetails})

   } catch (err) {
       res.status(400).json({error:err})
   }
}

export const updateDetails =async(req,res)=>{

   try {
       const userDetails = await User.findOneAndUpdate({_id:req.params.id},{
         userName:req.body.userName,
         email:req.body.email,
         number:req.body.number
       })
       if(!userDetails){
         return res.status(200).json({success:false,message:"User not found"})
       }

      res.status(200).json({message:"user data updated successfully",userDetails})
       
   } catch (err) {
       res.status(400).json({error:err})
   }
}



export const updatePassword =async(req,res)=>{

   try {

      let password = req.body.newPassword

       if(password){
         const hashedPassword=await bcrypt.hash(password,10);
   
         await User.findOneAndUpdate({_id:req.params.id},{
         password:hashedPassword
       })
       
         return res.status(200).json({message:"user password is updated successfully"})
      }
       
   } catch (err) {
       res.status(400).json({error:err})
   }
}

export const updateProfileImage =async(req,res)=>{

   try {
      const result = await cloudinary.uploader.upload(req.file.path);

     let user =  await User.findByIdAndUpdate(req.params.id,{
         $set:{
            profilePic:result.secure_url
         }
      })
      let pic=user.profilePic
      return res.status(200).json({message:"user image updated successfully",pic})
  } catch (err) {
      
          console.log('Error uploading file:', err.message);
      
      res.status(400).json({error:err})
  }
  
}


export const allDoctors = async (req,res)=>{

   try{
        const doctors=await Doctor.find();
        if(doctors){
             return   res.status(200).json({message:"doctors data sent successfully",doctors}) 
        }
        
        res.status(400).json({message:"their is no doctor"})
        
   } catch(err){
        res.status(400).json({error:err})
   }
}


export const getDoctor = async(req,res) => {
 
   try {
      const doctor = await Doctor.findOne({_id:req.params.id})
      res.status(200).json({message:"doctor data sent success",doctor})

   } catch (err) {
       res.status(400).json({error:err})
   }
}


export const bookSession = async(req,res) => {

   try {
            const today = moment().format('YYYY-MM-DD');
            // console.log("today=>",today);
            let userDetails = (req.body.userData)
            let doctorDetails = (req.body.doctorDetails)
            let user = await User.findById(userDetails.id);
            // console.log("user=>",user);

            const newSession =await Session.create({
                userId: user.id,
                doctorId: doctorDetails._id,
                timeSlot: req.body.time,
                plan: req.body.plan,
                sessionDate: req.body.date,
                bookedDate: today
            })

            res.status(200).json({message:"Session booked successfully",newSession})

   } catch (err) {
       console.log(err);
       res.status(400).json(err)
   }

}


export const appointment = async(req,res) => {

   try {
            let doctorId = (req.body.doctorDetails._id);
            let date = req.body.date;
            let time = req.body.time;

            Doctor.findByIdAndUpdate(
               doctorId,
               {
                 $push: {
                   appointments: {
                     date: date,
                     times: [time],
                   },
                 },
               },
               { new: true } // set new: true to return the updated document
             )
               .then((updatedDoctor) => {
                 console.log(updatedDoctor);
               })
               .catch((error) => {
                 console.error(error);
               });

            res.status(200).json({message:"appointment scheduled successfully"})

   } catch (err) {
       console.log(err);
       res.status(400).json(err)
   }
}


export const availability = async(req,res) => {

   try {
            let doctorId = req.body.doctorId
            let date = req.body.date;
            let time = req.body.time;

            const doctor = await Doctor.findById(doctorId);
            if (!doctor) {
              console.log('Doctor not found');
              return false;
            }
          
            const appointment = doctor.appointments.find(appointment => {
              return appointment.date.toISOString().substr(0, 10) === date && appointment.times.includes(time);
            });
          
            if (appointment) {
              console.log(`Appointment already exists for ${date} at ${time}`);
              return res.status(204).json({message:`Appointment already exists for ${date} at ${time}`})
            }
            
            console.log(`Time ${time} is available for ${doctor.fullName}`);
            return res.status(202).json({message:`Time ${time} is available for ${doctor.fullName}`})
         

   } catch (err) {
       console.log(err);
       res.status(400).json(err)
   }
}