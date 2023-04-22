import Razorpay from 'razorpay';
import crypto from "crypto"

export const order = async(req,res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZOR_KEY_ID,
            key_secret: process.env.RAZOR_SECRET_KEY,
        });
        const options = {
            amount: req.body.amount * 100,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        instance.orders.create(options, (error,order) => { 
            if(error) {
                console.log(error);
                return res.status(500).json({message: "Something went wrong!"})
            }
            res.status(200).json({ data: order })
         });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:`Error -> ${error}`})
    }
 }

 export const verifyPayment = async(req,res) => {
    try{
        const {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature } = req.body;
  
          const sign = razorpay_order_id + "|" + razorpay_payment_id;
          console.log()
          const expectedSign = crypto
          .createHmac("sha256", process.env.RAZOR_SECRET_KEY)
          .update(sign.toString())
          .digest("hex");
  
          console.log('sign:' +sign)
          console.log('signature' +razorpay_signature)
  
          if(razorpay_signature === expectedSign){
              console.log('verified!!!')
              return res.status(200).json({ message:"Payment verified succesfully!" });
          }else{
              return res.status(400).json({ message: "Invalid signature sent!" })
          }
      } catch (err) {
          console.log(err);
          res.status(500).json({message: "Internal server error!"});
      }
}
