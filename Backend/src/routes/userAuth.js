const express = require('express');
const {register,adminRegister,logOut,login,getProfile} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const authRouter = express.Router();


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logOut',userMiddleware,logOut);
authRouter.post('/admin/register',adminMiddleware,adminRegister);
authRouter.get('/check', userMiddleware,(req,res)=>{

    const reply = {
        firstName:req.result.firstName,
        emailId:req.result.emailId,
        _id:req.result._id,
        role:req.result.role
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})

module.exports = authRouter;