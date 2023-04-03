import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import Admin from "../model/admin.js";
import User from '../model/user.js'
import Doctors from '../model/doctor.js'

export const adminLogin = async(req,res)=>{

    try{
         const {email,password}=req.body;

         if(!email || !password){
            return res.status(200).json({success:false,message:"All fields are required"})
         }

         const adminDetails=await Admin.findOne({email})

         if(adminDetails){
             
              const matchPassword = await bcrypt.compare(password,adminDetails.password)
           
              if(!matchPassword) return res.status(200).json({success:false,message:"Admin Password is not matched"})
     
              const adminToken=jwt.sign({id:adminDetails._id},process.env.ADMIN_JWT_SECRET)
              res.status(200).json({success:true,message:"Login success",adminToken,adminDetails})
         }else{
             
              res.status(200).json({success:false,message:"admin credentials not found"})
         }
         
    } catch(err){
         res.status(400).json({error:err,message:"server error"})
    }

}

export const getAllUsers = async (req,res)=>{
    try{
         const users=await User.find();
         if(!users){
              return   res.status(200).json({message:"no users found"}) 
         }
         
         res.status(200).json(users)
         
    } catch(err){
         res.status(400).json({error:err})
    }
}

export const getAllDoctors = async (req,res)=>{
    try{
         const doctors=await Doctors.find();
         if(!doctors){
              return   res.status(200).json({message:"no doctors found"}) 
         }
         
         res.status(200).json(doctors)
         
    } catch(err){
         res.status(400).json({error:err})
    }
}




export const blockUser = async(req,res)=>{
    try {
        const users=await User.findOneAndUpdate({_id:req.params.id},{
            isBlocked:true
       })

       res.status(200).json({message:"user is blocked successfully",users})



    } catch(err){
        res.status(400).json({error:err})
    }
}



export const unBlockUser = async(req,res)=>{
    try {
        const user=await User.findOneAndUpdate({_id:req.params.id},{
            isBlocked:false
       })

       res.status(200).json({message:"user is unblocked successfully",user})

    } catch(err){
        res.status(400).json({error:err})
    }
}


export const verifyDoctor =async(req,res)=>{
    try {
        const doctor = await Doctors.findOneAndUpdate({_id:req.params.id},{
            isVerified:true
        })

        res.status(200).json({message:"doctor is verified successfully",doctor})
        
    } catch (err) {
        res.status(400).json({error:err})
    }
}