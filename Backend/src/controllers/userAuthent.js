const redisClient = require('../config/redis');
const User = require('../models/user');
const validate = require('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register; this api is working properly
const register = async(req,res)=>{

    try{

    //    validate the user information 
       validate(req.body);

    //    password ko hme phle hashcode me convert krna pdega then store krayenge
       const hashcode = await bcrypt.hash(req.body.password,10);
       req.body.password = hashcode;

        req.body.role = 'user';

    //    ab user information save krayenge apne DB 
       const user = await User.create(req.body);

       const reply = {
           firstName: user.firstName,
           emailId: user.emailId,
           _id: user._id,
           role: user.role
       }

       const token = jwt.sign({_id:user._id,emailId:user.emailId,role:'user'},
        process.env.JWT_SECRET_KEY,
        {expiresIn:60*60});  // this is token created for login or authentication

    //    console.log('first')
       res.cookie("token",token,{maxAge:60*60*1000});
    //    console.log('second')
       res.status(201).json({
         user:reply,
         message:'Registered Successfully.'
       })
    }
    catch(error)
    {
        res.status(400).send("Error: "+error);
    }

}

// admin register 
const adminRegister = async(req,res)=>{
        
    try{

    //    validate the user information 
       validate(req.body);

    //    password ko hme phle hashcode me convert krna pdega then store krayenge
       const hashcode = await bcrypt.hash(req.body.password,10);
       req.body.password = hashcode;
        req.body.role = 'admin';

    //    ab user information save krayenge apne DB 
       const user = await User.create(req.body);
       const token = jwt.sign({_id:user._id,emailId:req.body.emailId,role:user.role},
        process.env.JWT_SECRET_KEY,
        {expiresIn:60*60});

        res.cookie("token",token,{maxAge:60*60*1000});
       res.status(201).send("Registered Successfully.");

    }
    catch(error)
    {
        res.status(401).send("Error: "+error);
    }

}

// login 
const login = async(req,res)=>{

    try{

        const {emailId,password} = req.body;

        // check whether emailId is present or not 
        if(!emailId)
            throw new Error("Invalid Credentials.");

        // check whether password is present or not 
        if(!password)
            throw new Error("Invalid Credentials.");

        const userInfo = await User.findOne({emailId});
        const match = bcrypt.compare(password,userInfo.password); // check whether password correct or not

        if(!match)
            throw new Error("Invalid Credentials.");


        const reply = {
           firstName: userInfo.firstName,
           emailId: userInfo.emailId,
           _id: userInfo._id,
           role: userInfo.role
       }
       
       const token = jwt.sign({_id:userInfo._id,emailId:emailId,role:userInfo.role},process.env.JWT_SECRET_KEY,{expiresIn:60*60});
       res.cookie("token",token,{maxAge:60*60*1000});
       res.status(201).json({
         user:reply,
         message:'Logged in Successfully.'
       });

    }
    catch(error)
    {
        res.status(401).send("Error: "+error);
    }

}

// logOut
const logOut = async(req,res)=>{

    try{

        // validate token 
        const {token} = req.cookies;
        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`,'blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);

        res.cookie('token',null,{expires:new Date(Date.now())});
        res.send("Logged Out Successfully.");


    }
    catch(error)
    {
        res.send("Error: "+error);
    }

}

// getProfile

module.exports = {register,adminRegister,logOut,login};