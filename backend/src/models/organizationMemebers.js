import mongoose from 'mongoose'; 

const organizationMemberSchema = new mongoose.Schema({
    organizationId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    role: { type: String, enum: ["admin", "member", "owner"], default: "member" }
}); 

export default mongoose.model("OrganizationMember", organizationMemberSchema); 