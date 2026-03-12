import express from "express"; 
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
import User from '../models/users.js'; 

dotenv.config(); 
const router = express.Router(); 

router.post("/register", async (req, res) => {

    try {
        const { username, email, password, retypedPassword } = req.body; 

        if (!username || !email || !password || !retypedPassword) {
            return res.status(400).json({ message: "All fields are required!" }); 
        } 

         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(email)) {
            return res.status(400).json({
              message: "Invalid email address"
            });
          }
        
          if (!passwordRegex.test(password)) {
              return res.status(400).json({
                message:
                  "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
              });
        }
        else if (password !== retypedPassword) {
            return res.status(400).json({ message: "passwords don't match!" }); 
        }

        const existingEmail = await User.findOne({ email: email.toLowerCase() }); 

        if(existingEmail) {
            return res.status(409).json({ message: "Email already in use!" }); 
        }

        const hashed_password = await bcrypt.hash(password, 10); 

        const user = await User.create({
            username, 
            email: email.toLowerCase(), 
            password: hashed_password, 
        }); 

        return res.status(201).json({ message: "Registered Sucessfully!"}); 

    } catch(err) {
        return res.status(500).json({ message: "Internal Server Error! Error: ", error: err.message })
    }

}); 


router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body; 

        if(!username || !password) {
            return res.status(400).json({ message: "All fields are required!" }); 
        }

        const existingUser = await User.findOne({ username: username }); 

        if(!existingUser) {
            return res.status(404).json({ message: "No user was found!" }); 
        } 

        const passwordMatch = await bcrypt.compare(password, existingUser.password); 

        if(passwordMatch) {
            const token = jwt.sign(
                { userId: existingUser._id, username: existingUser.username }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            )
            
            return res.status(201).json({ message: "Login Successful!", token: token, userId: existingUser._id }); 

        } else {
            return res.status(400).json({ message: "invalid password" }); 
        }

    } catch(err) {
        console.error("Internal Server Error! Error: ", err); 
        return res.status(500).json({ message: "Internal Server Error! Error: ", err: err.message })
    }
})

export default router; 
