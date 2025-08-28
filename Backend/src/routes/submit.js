const express = require('express');
const submitRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {submitCode,runcode} = require('../controllers/userSubmission');


submitRouter.post('/submit/:_id',userMiddleware, submitCode);
submitRouter.post('/run/:_id', userMiddleware, runcode);

module.exports =  submitRouter;