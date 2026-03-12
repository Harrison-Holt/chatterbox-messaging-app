import express from "express"; 
import Message from "../models/message.js"; 
import mongoose from "mongoose"; 
import authMiddleware from '../middleware/middleware.js'; 

const router = express.Router(); 

router.post("/:id/messages", authMiddleware, async (req,res) => {

    try {
    const channelId = req.params.id; 
    const userId = req.user?.userId; 
    const { content } = req.body; 

    if(!channelId || !userId || !content) {
        return res.status(400).json({ message: "All fields are required!" }); 
    }

    const message = await Message.create({
        content: content, 
        sender: userId,
        channelId: channelId, 
    }); 

    return res.status(201).json({ message: "message sent!" }); 

    } catch(error) {
        return res.status(500).json({ message: "Internal Server Error! Error: ", error: error.message})
    }
}); 

router.get("/:id/messages", authMiddleware, async (req, res) => {

    try {

    const channelId = req.params.id; 
    
    const messages = await Message.find({ channelId: channelId })
    .populate("sender", "username")
    .sort({ createdAt: 1 });
    
    if(messages.length === 0) {
        res.status(200).json({ message: "No messages in this channel! Start the conversation!" }); 
        return; 
    }

    res.status(200).json({ message: "All messages in the channel", messages: messages }); 

    } catch(error) {
        res.status(500).json({ message: "Internal Server Error!", error: error.message }); 
    }
}); 

export default router; 
