const{ GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GEMINI_API_KEY});

const aiDsAGuru = async(req,res) => {
    try {
          const { prompt } = req.body;
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })
        res.status(200).send(response.text);
    }
    catch (error) {
        res.status(500).send(`Internal Server Error aiDsAGuru: ${error}`);
    }
}

module.exports = aiDsAGuru;