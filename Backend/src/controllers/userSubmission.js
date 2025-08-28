const Submission = require('../models/submission');
const {getIdByLanguage, submitBatch, submitToken} = require('../utils/problemUtility');
const Problem = require('../models/problem');

// running the code
const runcode = async (req,res)=>{

    try{
        
        const userId = req.result._id;
        const problemId = req.params._id;
        const {code,language} = req.body;

        if(!(userId||problemId||code||language))
            res.status(400).send("Some field missings.");

        const languageId = getIdByLanguage(language);

        // find problem from database using their Id
        const problem = await Problem.findById({problemId});
        const submissions = problem.visibleTestCases.map((testCases)=>({
            source_code: code,
            language_id: languageId,
            stdin: testCases.input,
            expected_output: testCases.output
        }));

        const submissionResult = await submitBatch(submissions);

        const resultToken = submissionResult.map((value)=> value.token);

        const testResult = await submitToken(resultToken);

        res.status(201).send(testResult);
    }
    catch(error)
    {
        res.status(500).send({error: "An error occurred while running code."});
    }
}

// submission the code
const submitCode = async (req, res)=>{

    try{

        const userId = req.result._id;
        const problemId = req.params._id;
        const {code,language} = req.body;

        // validation of credentials 
        if(!(userId||problemId||code||language))
            res.status(400).send("Some field missing.");

        // convert language to languageId
        const languageId = getIdByLanguage(language);

        // this first saves the problem in DB 
        const problem = await Problem.findById({problemId});

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: 'pending',
            totalTestCases: problem.hiddenTestCases.length 
        });

        const submissions = Problem.hiddenTestCases.map((testCases)=>({
            source_code: code,
            language_id: languageId,
            stdin: testCases.input,
            expected_output: testCases.output
        }));

        const submissionResult = await submitBatch(submissions);

        const resultToken = submissionResult.map((testCases)=> testCases.token);

        const testResult = await submitToken(resultToken);

        // submitted result ko update kre 
        let totalTestCasesPassed = 0;
        let runTime = 0;
        let status = "Accepted";
        let memory = 0;
        let errorMessage = null;

        for(const test of testResult)
        {
            if(test.status_id == 3)
            {
                totalTestCasesPassed++;
                runTime = runTime+parseFloat(test.time);
                memory = Math.max(memory,test.memory);
            }
            else
            {
                if(test.status_id == 4)
                {
                    status = "error";
                    errorMessage = test.stderr;
                }
                else
                {
                    status = 'wrong';
                    errorMessage = test.stderr;
                }
            }
        }

      submittedResult.status = status;
      submittedResult.totalTestCasesPassed = totalTestCasesPassed;
      submittedResult.errorMessage = errorMessage;
      submittedResult.memory = memory;
      submittedResult.runTime = runTime;

      await submittedResult.save();

      if(!req.result.problemSolved.includes(problemId)){
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    res.status(201).send(submittedResult);


    }
    catch(error)
    {
        res.status(500).send({error: "An error occurred while submitting code."});
    }
};

module.exports = {submitCode,runcode};