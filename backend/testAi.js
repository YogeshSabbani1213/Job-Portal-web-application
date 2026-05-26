import dotenv from "dotenv";
dotenv.config();

import generateAIResponse from "./ai/openrouter.js";

async function testAI() {
  const result = await generateAIResponse(
    "Tell me top 5 skills for React Developer"
  );

  console.log(result);
}

testAI();