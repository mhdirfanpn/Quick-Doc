import Doctor from '../model/doctor.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js'
import moment from 'moment'


export const registerDoctor = async (req,res) => {
    try {
        const {email,password,fullName,number,date,experience,register,specialization}=req.body
        

        if(!email || !password || !fullName || !number || !date || !experience || !register || !specialization){
            return res.status(401).json({message:'all fields are required'})
        }

        const doctorDetails = await Doctor.findOne({email})

        if(doctorDetails){
            res.status(200).json({success:false,message:"Doctor already Registered"})
         }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const newDoctor= await Doctor.create({
               fullName,
               email,
               password:hashedPassword,
               number,
               date,
               experience,
               register,
               specialization
            })
            res.status(200).json({success:true,message:"success new doctor created",doctor:newDoctor})
         }

    } catch (error) {
          res.status(500).json({error:err})
    }
}



export const doctorLogin = async(req,res)=>{
    try{
        const {email,password}=req.body;

          if(!email || !password){
            return res.status(401).json({message:'all fields are required'})
          }
       
          const doctorDetails=await Doctor.findOne({email});
          console.log(doctorDetails);
          if(doctorDetails){

            if(!doctorDetails.isVerified){
                return res.status(200).json({success:false,message:"doctor is not verified"})
            }

             const passMatch=await bcrypt.compare(password,doctorDetails.password);

             if(!passMatch){
                return res.status(200).json({success:false,message:"Doctor Password is invalid"})
             }
             
             const token=jwt.sign({id:doctorDetails._id},process.env.DOC_JWT_SECRET,{expiresIn:'30d'});
             res.status(200).json({success:true,token,doctorDetails})

          }else{
             res.status(200).json({success:false,message:"Doctor not found"})
          }
       }

       catch(err){
        res.status(400).json({error:err})
     }
 }


 export const doctorDetails = async(req,res) => {

   try {
      const doctorDetails=await Doctor.findOne({_id:req.params.id})
      res.status(200).json({message:"data sent successfully successfully",doctorDetails})

  } catch(err){
   console.log(err);
      res.status(400).json({error:err})
  }
 }


export const updateDetails =async(req,res)=>{

   try {
      let timings = req.body.timings
      const times = timings.map(time => moment.utc(time).format('h:mm A'));

console.log(times);
  
       const doctorDetails = await Doctor.findOneAndUpdate({_id:req.params.id},{
         fullName:req.body.fullName,
         email:req.body.email,
         number:req.body.number,
         experience:req.body.experience,
         timings:times
       })
       if(!doctorDetails){
         return res.status(200).json({success:false,message:"Doctor not found"})
       }

      res.status(200).json({message:"doctor data updated successfully",doctorDetails})
       
   } catch (err) {
       res.status(400).json({error:err})
   }
}

export const updatePassword =async(req,res)=>{

   try {

      let password = req.body.newPassword

       if(password){
         const hashedPassword=await bcrypt.hash(password,10);
   
         await Doctor.findOneAndUpdate({_id:req.params.id},{
         password:hashedPassword
       })
       
         return res.status(200).json({message:"doctor password is updated successfully"})
      }
       
   } catch (err) {
       res.status(400).json({error:err})
   }
}


export const updateProfileImage =async(req,res)=>{
   console.log('hello');
   try {
      const result = await cloudinary.uploader.upload(req.file.path);

     let user =  await Doctor.findByIdAndUpdate(req.params.id,{
         $set:{
            profilePic:result.secure_url
         }
      })
      let pic=user.profilePic
      return res.status(200).json({message:"doctor image updated successfully",pic})
  } catch (err) {
      
          console.log('Error uploading file:', err.message);
      
      res.status(400).json({error:err})
  }
  
}

