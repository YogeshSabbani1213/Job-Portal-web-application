import axios from "axios";

const generateAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openchat/openchat-7b:free", // Note: Consider upgrading to "meta-llama/llama-3-8b-instruct:free" if this model is down
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

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response structure from OpenRouter API");
    }

    return response.data.choices[0].message.content;
  } catch (axiosError) {
    // This highlights exactly what OpenRouter is complaining about in your terminal logs
    console.error("OpenRouter API Error Details:", axiosError.response?.data || axiosError.message);
    throw new Error(`OpenRouter API failed: ${axiosError.message}`);
  }
};

export default generateAIResponse;