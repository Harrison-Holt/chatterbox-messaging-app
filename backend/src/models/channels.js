import mongoose from 'mongoose'; 

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    description: { type: String, required: true }, 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}); 

export default mongoose.model("Channel", channelSchema); 