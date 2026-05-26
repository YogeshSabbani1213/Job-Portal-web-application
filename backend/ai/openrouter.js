import axios from "axios";

const generateAIResponse = async (prompt) => {

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openchat/openchat-7b:free",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://job-portal-web-application-y35m.onrender.com",
        "X-Title": "Job Portal AI"
      },
    }
  );

  return response.data.choices[0].message.content;
};

export default generateAIResponse;