const mongoose = require('mongoose');


// it connection to mongoDB database 
async function  main()
{
    await mongoose.connect('mongodb+srv://jitendra04:mongodb%4012345@codingadda.nxvmkxc.mongodb.net/Leetcode');
}

module.exports = main;