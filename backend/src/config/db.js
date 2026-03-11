import mongoose from "mongoose"; 

export default async function db_connection() {
    const uri = process.env.MONGO_URI; 

    if (!uri) {
        throw new Error("MONGO URI  is missing in .env!")
    }

    try {
        mongoose.set("strictQuery", true); 
        await mongoose.connect(uri); 
        console.log("Mongo connected")
    } catch(err) {
        console.error("Mongo connection failed! Error: ", err.message)
        process.exit(1); 
    }
}