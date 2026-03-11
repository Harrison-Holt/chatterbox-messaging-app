import mongoose from 'mongoose'; 

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true }, 
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    channelId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    }, 
    { timestamps: true }
); 

export default mongoose.model("Message", messageSchema); 