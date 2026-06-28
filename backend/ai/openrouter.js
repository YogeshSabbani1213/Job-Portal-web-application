//This file is responsible for talking to the AI.

import axios from 'axios'       //To make HTTP requests.Sends a POST request to OpenRouter API.

async function generateAIResponse(prompt){
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions", //This is the AI endpoint.All prompts are sent here.It comes from the OpenRouter API documentation.
      {
       model: "openrouter/free", //Tells OpenRouter which AI model to use.
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      //Contains API Key and project information.
      {
        headers: { 
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",                         //Tells server we're sending JSON.
          "HTTP-Referer": "https://job-portal-web-application-y35m.onrender.com",//Identifies which website is making the request.
          "X-Title": "Job Portal AI"
        },
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response structure from OpenRouter API");
    }
    return response.data.choices[0].message.content; //Return only AI text.Instead of whole response
  } 
  catch (axiosError) {
    console.error("OpenRouter API Error Details:", axiosError.response?.data || axiosError.message);
    throw new Error(`OpenRouter API failed: ${axiosError.message}`);
  }
};

export default generateAIResponse