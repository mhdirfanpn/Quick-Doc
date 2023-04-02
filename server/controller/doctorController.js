import Doctor from '../model/doctor.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'


export const registerDoctor = async (req,res) => {
    try {
        const {email,password,userName,phoneNumber,dateOfBirth,}=req.body

        if(!email || !password || !userName || !phoneNumber || !dateOfBirth){
            return res.status(401).json({message:'all fields are required'})
        }

        const doctorDetails = await Doctor.findOne({email})

        if(doctorDetails){
            res.status(200).json({success:false,message:"Doctor already Registered"})
         }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const newDoctor= await Doctor.create({
               userName,
               email,
               password:hashedPassword,
               phoneNumber,
               dateOfBirth
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
