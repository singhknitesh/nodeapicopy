

import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import Errorhandler from "../middlewares/error.js";



 export const login =async(req,res)=>{

try {
    const{email,password} = req.body;

const user = await User.findOne({email}).select("+password");                                          

if(!user) return next(new Errorhandler("Task Not found",400));

const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch)return next(new Errorhandler("Task Not found",400));


sendCookie(user,res,`Welcome back,${user.name}`,200);
} catch (error) {
    next(error);
}
 };

 export const register =async(req,res)=>{
try {
    const{name,email,password}=req.body;

let user = await User.findOne({email});

if(user) return next(new Errorhandler("User Already Exist",400));

const hashedPassword = await bcrypt.hash(password,10);
user = await User.create({ name, email, password:hashedPassword});

sendCookie(user,res,"register succesfully",201);
} catch (error) {
    next(error);
}
 };

    
export const getMyProfile = (req,res)=>{


res.status(200).json({
    success:true,
    user: req.user,
});

};

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development"? "lax":"none",
        secure: process.env.NODE_ENV === "Development"? false: true,
    })
    .json({
        success:true,
        user: req.user,
    });
    
    };

            