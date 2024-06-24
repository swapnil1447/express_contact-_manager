const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require("../models/useModel")
//@desc register
//@routes POST /api/contact 
//@access public  
const jwt= require("jsonwebtoken")
const registerUser = asyncHandler(async (req,res)=>{
   // const contacts=await Contact.find();
   const {username,email,password}=req.body;
   if(!username || !email ||!password){
    res.status(400)
    throw new Error("ALL field are mandatory")
   }
   const userAvailable=await User.findOne()
   if(userAvailable){
    res.status(400)
    throw new Error("User available already")
   }
   const hashpassword=await bcrypt.hash(password,10);
   console.log(hashpassword)
   const user=await User.create({
    username,
    email,
    password:hashpassword,
   })
   console.log(`user create ${user}`)
   if(user){
    res.status(201).json({
        _id:user.id,email:user.email
    })
   }else{
    res.status(400)
    throw new Error("user data is not  valid")
   }
    res.json({message:"User registerd"});
})
//@desc login
//@routes POST /api/contact 
//@access public  

const loginUser = asyncHandler(async (req,res)=>{
    //const contacts=await Contact.find();
    const{email,password}=req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All field required")
    }
    const user=await User.findOne({email});
    //compare password with hash
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"15m"
        }
        )
        res.status(200).json({accesstoken})
    }else{
        res.status(401)
        throw new Error("email or password not valid")
    }
    
})
//@desc displayinfor
//@routes GET /api/contact 
//@access private  

const currentUser = asyncHandler(async (req,res)=>{
    //const contacts=await Contact.find();
    
    res.json(req.user)
})
module.exports={loginUser,registerUser,currentUser}