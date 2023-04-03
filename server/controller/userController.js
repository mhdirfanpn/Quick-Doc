import User from '../model/user.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'


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
               date
            })
            res.status(200).json({success:true,message:"success new user created",user:newUser})
         }

    } catch (error) {
          res.status(500).json({error:err})
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
             
             const token=jwt.sign({id:userDetails._id},process.env.JWT_SECRET,{expiresIn:'30d'});
             res.status(200).json({success:true,token,userDetails})

          }else{
             res.status(200).json({success:false,message:"User not found"})
          } 
       }

       catch(err){
        res.status(400).json({error:err})
     }
 }
