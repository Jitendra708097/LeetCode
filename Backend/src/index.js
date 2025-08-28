const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const main = require('./config/db');
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problemCreator');
const redisClient = require('./config/redis');
const submitRouter = require('./routes/submit');
const DsAGuruRouter = require('./routes/DsAGuru');

const app = express();

app.use(express.json());
app.use(cookieParser());

// By default, web browsers follow the Same-Origin Policy, 
// which blocks a web page from making requests to a different 
// domain than the one that served the web page. CORS is a 
// mechanism that tells the browser it's safe to allow your 
// React app to talk to your Express server.
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',DsAGuruRouter);



const startServer = async()=>
{
    try{
        
        await main();
        console.log('Connected to the database successfully');

        // console.log("hello")
        await redisClient.connect();
        // console.log("h")
        console.log('Connected to redis.');

        // await Promise.all([main(),redisClient.connect()]);

        app.listen(process.env.PORT_NUMBER, () => {
            console.log(`Server is listening on port ${process.env.PORT_NUMBER}`);
        });

    }
    catch(error)
    {
        console.log('Error starting the server: ' + error.message);
    }
};

startServer();