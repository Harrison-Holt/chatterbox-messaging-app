import mongoose from 'mongoose'; 

const organiationJoinRequestSchema = new mongoose.Schema({
    organizationId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    status: { type: String, enum: ["pending", "rejected", "approved"], default: "pending" }
}); 

export default mongoose.model("organizationJoinRequest", organiationJoinRequestSchema); 