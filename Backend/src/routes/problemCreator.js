const express = require('express');
const {problemCreate,problemUpdation,deleteProblemById,getAllProblem,getProblemById} = require('../controllers/userProblem');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const problemRouter = express.Router();

//  create 
problemRouter.post('/create',adminMiddleware,problemCreate);
problemRouter.put('/update/:_id',adminMiddleware,problemUpdation);
problemRouter.get('/fetch/:_id',userMiddleware,getProblemById);
problemRouter.get('/',userMiddleware,getAllProblem);
problemRouter.delete('/delete/:_id',adminMiddleware,deleteProblemById);


module.exports = problemRouter;