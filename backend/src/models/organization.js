import mongoose from 'mongoose'; 

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    description: { type: String, required: true }, 
    isPublic: { type: Boolean }
}); 

export default mongoose.model("Organization", organizationSchema); 