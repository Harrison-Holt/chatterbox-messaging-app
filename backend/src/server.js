import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"; 
import channelRoutes from "./routes/channelRoutes.js"; 
import organizationRoutes from './routes/organizationRoutes.js'; 
import db_connection from "./config/db.js"; 
import messageRoutes from "./routes/messageRoutes.js"; 

dotenv.config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.use("/api/auth", authRoutes); 
app.use("/api/channels", channelRoutes); 
app.use("/api/organization", organizationRoutes); 
app.use("/api/channels", messageRoutes); 

app.get("/health", (req, res) => {
    res.json({ ok: true }); 
}); 

const port = process.env.PORT || 5000; 

await db_connection(); 
      db_connection
app.listen(port, () => {
    console.log(`Server runningat http://localhost:${port}`)
}); 


