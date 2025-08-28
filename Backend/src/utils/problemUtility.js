const axios = require('axios');

// this function is for to get Id of language by their name.
const getIdByLanguage = (lang)=>{

    const language = {
        "c++":54,
        "java":62,
        "js":63,
        "python":71
    }

    return language[lang.toLowerCase()];
}

// this function is for to save problem in Database.
const submitBatch = async (submissions)=>{
      console.log("Hello");
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': process.env.JUDJE0_API_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

console.log("Hello1")
async function fetchData() {
	try {
		const response = await axios.request(options);
    // console.log(response);
		return response.data;
	} catch (error) {
		console.error("Error: "+error);
	}
}

return await fetchData();
}


const waiting = async(timer)=>{
  setTimeout(()=>{
  return 1;
  },timer);
}

// this is for get final answer from Judge0 of this code.
const submitToken = async (tokenResult)=>{

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: tokenResult.join(","),
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '3bfb8a85e7mshb6623a77089844cp16db19jsnd341570ccb71',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
    return response.data;
	} catch (error) {
		console.error(error);
	}
}

while(true)
{

  const res = await fetchData();
  const IsResultObtained = res.submissions.every((r)=> r.status_id>2);
  if(IsResultObtained)
    return res.submissions;

  await waiting(1000);
}
}
module.exports = {getIdByLanguage,submitBatch,submitToken};