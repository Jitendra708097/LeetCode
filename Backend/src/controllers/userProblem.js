const {getIdByLanguage,submitBatch,submitToken} = require('../utils/problemUtility');
const Problem = require('../models/problem');
// create problem 
const problemCreate = async(req,res)=>{

      const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
       
      for(const {language,completeCode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getIdByLanguage(language);
          
        // I am creating Batch submission
        const submissions = visibleTestCases.map((testcase)=>({
            source_code:completeCode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        // console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);

        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);


       console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}

// update in problem 
const problemUpdation = async (req,res)=>{

    const {title,description,difficulty,
            tags,visibleTestCases,hiddenTestCases,
            startCode,referenceSolution,problemCreator
         } = req.body;

    try{
        for(const {language,completeCode} of referenceSolution)
         {
            // source_code
            // language_Id
            // stdin 
            // expected_output

            const {_id} = req.params;
            if(!_id)
                return res.status(400).send("Id is missing.");

            const dsaProblem = await Problem.findById(_id);
            if(!dsaProblem)
                return res.status(400).send("Problem is missing.");

            const languageId = getIdByLanguage(language);
            if(!languageId)
                return res.status(400).send("Language Id is not present here.");

            const submissions = visibleTestCases.map((testcase)=> ({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));

            const submitResult = await submitBatch(submissions);
            // console.log("submitResult: "+submitResult);

            const tokenResult = submitResult.map((value)=> value.token);
            // console.log("Tokenresult: "+tokenResult);

            const testResult = await submitToken(tokenResult);
            // console.log("testResult: "+testResult);

            for(const test of testResult)
            {
                // if(test.status_id == 4)
                //     return res.send("Wrong Answer");
                if(test.status_id == 5)
                    return res.send("Time Limit Exceeded");
                // if(test.status_id == 6)
                //     return res.send("Compilation Error");
                if(test.status_id == 7)
                    return res.send("Runtime Error (SIGSEGV)");
                if(test.status_id == 13)
                    return res.send("Internal Error");
                if(test.status_id == 14)
                    return res.send("Exec Format Error");
                    
            }
         }

         const userProblem = await Problem.findByIdAndUpdate(req.params._id,
            {...req.body},
            {runValidators:true, new:true}); 

          res.status(201).send("Updation Successfully Completed.");
    }
    catch(error)
    {
        res.send("Error: "+error);
    }
}

// get problem  by Id
// this is also working properly completed testing 
const getProblemById = async (req,res)=>{

    try{
        // console.log("req.params: "+req.params)
        // console.log("Hello");
        const { _id } = req.params;
        // console.log(_id)
        if(!_id)
            return res.status(400).send("Id is missing.");

        const fetchProblemById = await Problem.findById(_id);
        if(!fetchProblemById)
            return res.status(400).send('No problem related this Id');

        res.status(200).send(fetchProblemById);
    }
    catch(error)
    {
        res.send("Error: "+error);
    }
}

// getAllProblem problem 
// This function is working properly testing successful from postman APIs calls 
const getAllProblem = async (req,res)=>{

    try{

        const problemFetched = await Problem.find({});
        if(problemFetched.length == 0)
            return res.status(404).send("Here nothing is present.");
        
        res.status(200).send(problemFetched);

    }
    catch(error)
    {
        res.status(500).send("Error: "+error);
    }
}

// delete problem By Id
// this is also working properly testing done 
const deleteProblemById = async (req,res)=>{

    try{

        const {_id} = req.params;
        if(!_id)
            return res.status(400).send("Id is missing.");

        const deletedProblem = await Problem.findByIdAndDelete(_id);
        if(!deletedProblem)
            return res.status(404).send("Problem missing.");

        res.status(200).send("Problem deleted successfully.");
    }
    catch(error)
    {
        res.send("Error: "+error);
    }
}

module.exports = {problemCreate,problemUpdation,deleteProblemById,getAllProblem,getProblemById};