import User from '../model/user.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js'



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
             
             const token=jwt.sign({id:userDetails._id,name:userDetails.userName,password:userDetails.password},process.env.JWT_SECRET,{expiresIn:'30d'});
             res.status(200).json({success:true,token,userDetails})

          }else{
             res.status(200).json({success:false,message:"User not found"})
          } 
       }   

       catch(err){
        res.status(400).json({error:err})
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