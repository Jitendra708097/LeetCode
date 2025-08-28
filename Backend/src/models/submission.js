const mongoose = require('mongoose');
const {Schema} = mongoose;

const submissionSchema = new Schema({
    title:{
        type:String,
        required:true 
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    problem_id:{
        type:Schema.Types.ObjectId,
        ref:'problem',
        required:true
    },
    code:{
        type:String,
        required:true 
    },
    language:{
        type:String,
        required:true,
        enum:["c","c++","js","python"]
    },
    passesTestCases:{
        type:Number,
        required:true,
        default:0
    },
    totalTestCases:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:String,
        required:true,
        enum:["Pending","Accepted","Wrong","Time Limited Exceeded","Runtime Error"]
    },
    runTime:{
        type:String,
        required:true 
    }
},{
    timestamps:true
});

const codeSubmission = mongoose.model("codeSubmission",submissionSchema);
module.exports = codeSubmission;