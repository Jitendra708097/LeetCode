const jwt = require('jsonwebtoken');
const user = require('../models/user');
const redisClient = require('../config/redis');

const userMiddleware = async(req,res,next)=>{

    try{

        const { token } = req.cookies;
        if(!token)
            throw new Error("Token is not present");

        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log(payload);
        if(!payload)
            throw new Error("Error: "+error);

        const { _id } = payload;
        if(!_id)
            throw new Error("Invalid token");

        const result = await user.findById(_id);
        if(!result)
            throw new Error("User Doesn't exist.");

        const isBlocked = await redisClient.exists(`token:${token}`);
        if(isBlocked)
            throw new Error("Invalid token.");

        req.result = result;

        next();


    }
    catch(error){
        res.status(401).send("Error: "+error.message);
    }
}

module.exports = userMiddleware;