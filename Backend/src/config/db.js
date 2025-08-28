const mongoose = require('mongoose');


// it connection to mongoDB database 
async function  main()
{
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
}

module.exports = main;