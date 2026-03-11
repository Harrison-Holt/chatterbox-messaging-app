import express from "express"; 
import Channel from '../models/channels.js'; 
import authMiddleware from '../middleware/middleware.js'; 
import mongoose from 'mongoose'; 

const router = express.Router(); 

router.post("/create", authMiddleware, async (req,res) => {
    
    try {
        const { name, description } = req.body; 

        if(!name || !description) {
            return res.status(400).json({ message: "All fields are required!" }); 
        }

        const userId = req.user?.userId; 
        if (!userId) {
            return res.status.json({ message: "Unauthorized" })
        }

        const existing = await Channel.findOne({ name: name.trim() });
        
        if(existing) {
            return res.status(400).json({ message: "Channel already exist!" }); 
        }

        const channel = await Channel.create({
            name: name.trim(), 
            description: description.trim(), 
            createdBy: userId, 
            members: [userId], 
        }); 
        
        return res.status(201).json({ message: "Channel created!" }); 

    } catch(error) {
        return res.status(500).json({ message: "Internal Server Error! Error: ", error }); 
    }
}); 

router.get("/public", authMiddleware, async (req, res) => {
  try {
    const channels = await Channel.find();

    return res.status(200).json({
      message: "All channels",
      channels,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const channels = await Channel.find({ members: userId });

    return res.status(200).json({
      message: "User channels",
      channels,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
});

router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const channelId = req.params.id;
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found!" });
    }

    if (channel.members.some((member) => member.toString() === userId.toString())) {
      return res.status(400).json({ message: "User already joined this channel!" });
    }

    await Channel.updateOne(
      { _id: channelId },
      { $addToSet: { members: userId } }
    );

    return res.status(200).json({ message: "Channel joined!" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
});

export default router; 