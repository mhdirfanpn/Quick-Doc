import express from "express";
const router = express.Router();
import Message from "../model/message.js";


router.post("/",async(req,res)=>{
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:conversationId",async(req,res)=>{
    try {
        console.log('asdfjasijdhasjdh');
        console.log(req.params.conversationId);
        const message = await Message.find({
            conversationId:req.params.conversationId,
        })
        console.log(message);
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
})






export default router;