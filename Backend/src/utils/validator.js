const validator = require('validator');

const validate = (data)=>
{
    try{
        const mandatoryField = ["firstName","password","emailId"];
        const isContain = mandatoryField.every((k)=> Object.keys(data).includes(k));
        if(!isContain)
            throw new Error("Some Missing Fields.");

        if(!validator.isEmail(data.emailId))
            throw new Error("Invalid email.");

        // if(validator.isStrongPassword(data.password))
        //     throw new Error("Weak password please enter strong password.");
    }
    catch(error)
    {
        console.log("Error: "+error);
    }

}

module.exports = validate;