const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true,
        lowercase:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    problemSolved:{
        type:[String]
    }
},{
    timestamps:true
});

const User = mongoose.model("user",userSchema);
module.exports = User;