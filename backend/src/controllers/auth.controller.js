import User from "../models/User.js"
import jwt from "jsonwebtoken" 
import dotenv from "dotenv"
import bcrypt from 'bcryptjs';
import { upsertStreamUser } from "../lib/Stream.js";

dotenv.config()

export async function signup(req,res){
    const {email,password,fullName}=req.body;

    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }

        const idx = Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`

        const newUser=await User.create({
            email,
            fullName,
            password:hashedPassword,
            profilePic:randomAvatar,
        })

        try{
            await upsertStreamUser({
                id:newUser._id.toString(),
                name:newUser.fullName,
                image:newUser.profilePic || "",

            })
        }
        catch(error){
            console.log("error creatind user:",error)

        }

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY, {expiresIn:"7d"})
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV='production'

        })

        res.status(201).json({success:true,user:newUser})


    }catch(error){
        console.log(error)
        res.status(500).json({message:"internal server Error"})

    }

    
}

export async function login(req,res){
    const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY, {expiresIn:"7d"})
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV='production'

    })

    // 3. Respond with success
    res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
}


export async function logout(req,res){
    res.clearCookie('jwt'); // only works if you used cookies
    res.status(200).json({ message: 'Logout successful' });
}

export async function onboard(req,res){
    
    try{
        const userId=req.user._id

        const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body

        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({
                message:"All fields are required",
                missingFields:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ],
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,isOnboarded:true,
        },{new:true})

        if(!updatedUser){
            res.status(404).json({ message: 'user not found' });

        }

        try{
            await upsertStreamUser({
                id:updatedUser._id.toString(),
                name:updatedUser.fullName,
                image:updatedUser.profilePic ||"",

            })
    

        }catch(streamError){
            console.log("error updating stream user during onboarding:",streamError.message)

        }

       
        res.status(200).json({success:true, user: updatedUser });



    }catch(error){
        res.status(500).json({ message: 'internal server error' });

    }

}